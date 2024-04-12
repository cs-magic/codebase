import { type Prisma } from "@prisma/client"
import { type Message } from "wechaty"
import {
  ERR_MSG_INADEQUATE_PERMISSION,
  ERR_MSG_SUCCESS,
} from "../../common-common/messages"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { isSenderAdmin } from "../utils/is-sender-admin"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { z } from "zod"

export const uniChatterSchema = z.union([
  z.literal("start-chat"),
  z.literal("stop-chat"),
  z.literal("topic"),
  z.literal("list-topics"),
  z.literal("new-topic"),
  z.literal("set-topic"),
])

export class UniChatterMessageHandler extends BaseMessageHandler {
  public async onMessage(message: Message) {
    const result = parseCommand(message.text(), uniChatterSchema)

    const table = prisma[
      message.room() ? "wechatRoom" : "wechatUser"
    ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate

    const convId = message.conversation().id

    const conv = await table.findUnique({
      where: { id: convId },
    })

    if (result?.command) {
      switch (result.command) {
        case "start-chat":
          if (!conv?.chatbotEnabled) {
            await message.say(
              this.bot.prettyQuery(
                "AI聊天使用说明",
                ["请先设置话题再继续哦！"].join("\n"),
                [
                  "/new-topic [名称]: 开启新话题",
                  "/list-topics: 查询话题历史",
                ].join("\n"),
              ),
            )
          } else if (isSenderAdmin(message)) {
            await table.update({
              where: { id: convId },
              data: {
                // chatbotTopic: null,
                chatbotEnabled: true,
              },
            })
            await message.say(`AI聊天已启动，当前话题：${conv.chatbotTopic}`)
          } else {
            await message.say(ERR_MSG_INADEQUATE_PERMISSION)
          }
          break

        case "new-topic":
          await table.update({
            where: { id: convId },
            data: {
              chatbotTopic: result.args,
            },
          })
          await message.say(
            this.bot.prettyQuery("话题设置成功", `当前会话为：${result.args}`),
          )
          break

        case "set-topic":
          break

        case "topic":
          await message.say(
            this.bot.prettyQuery(
              "当前话题",
              `name: ${conv?.chatbotTopic ?? "暂无"}`,
            ),
          )
          break

        case "list-topics":
          const messages = await prisma.wechatMessage.findMany({
            where: {
              // 三者任一即可
              OR: [
                { roomId: convId },
                { listenerId: convId },
                { talkerId: convId },
              ],
            },
            orderBy: { createdAt: "asc" },
          })

          const topicDict: Record<string, number> = {}
          let lastTopic: string | null = null
          const started = true // todo: switch
          messages.forEach((row) => {
            const parsed = parseCommand(row.text ?? "", ["new-topic"])
            if (parsed) {
              switch (parsed?.command) {
                case "new-topic":
                  lastTopic = parsed?.args ?? "默认"
                  if (!(lastTopic in topicDict)) topicDict[lastTopic] = 0
                  break
              }
            } else if (
              started &&
              lastTopic !== null &&
              !row.text?.startsWith("/")
            ) {
              ++topicDict[lastTopic]
            } else {
              // don't do anything
            }
          })

          await message.say(
            this.bot.prettyQuery(
              "历史话题列表",
              Object.keys(topicDict)
                .map((k, index) => `${index + 1}. ${k} (${topicDict[k]}条消息)`)
                .join("\n"),
              [
                "/set-topic [N]: 继续第N个话题",
                "/new-topic [TITLE]: 开启新话题",
              ].join("\n"),
            ),
          )
          break

        case "stop-chat":
          await table.update({
            where: { id: convId },
            data: {
              // chatbotTopic: null,
              chatbotEnabled: false,
            },
          })
          await message.say(ERR_MSG_SUCCESS)
          break
      }
    }

    if (result?.command || !conv?.chatbotEnabled || message.self()) return

    /**
     * 1.        -->     Q: /start --> ok --> Q: ...
     * 2. Q: ... --> Q: /set-topic --> ok --> Q: ...
     */

    const model = this.bot.context?.preference.model
    if (!model) {
      await message.say(this.bot.prettyQuery("系统错误", "暂未配置模型"))
      return
    }

    const res = await callLLM({
      messages: [
        {
          role: "user",
          content: message.text(),
        },
      ],
      model,
    })
    const content = res.response?.choices[0]?.message.content
    if (!content) throw new Error("LLM return nothing")
    await message.say(content)
  }
}
