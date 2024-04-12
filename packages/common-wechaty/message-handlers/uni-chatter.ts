import { type Prisma } from "@prisma/client"
import { type Message } from "wechaty"
import { z } from "zod"
import { isNumeric } from "../../common-common/is-numeric"
import { ERR_MSG_INADEQUATE_PERMISSION } from "../../common-common/messages"
import { prettyInvalidChoice } from "../../common-common/pretty-invalid-choice"
import { LiteralUnionSchema } from "../../common-common/schema"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { isSenderAdmin } from "../utils/is-sender-admin"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"

export const uniChatterSchema = z.union([
  z.literal("start-chat"),
  z.literal("stop-chat"),
  z.literal("topic"),
  z.literal("list-topics"),
  z.literal("new-topic"),
  z.literal("set-topic"),
])

export const listTopics = async (convId: string) => {
  const messages = await prisma.wechatMessage.findMany({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
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
    } else if (started && lastTopic !== null && !row.text?.startsWith("/")) {
      ++topicDict[lastTopic]
    } else {
      // don't do anything
    }
  })

  return topicDict
}

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

    if (!conv) throw new Error("Missing Conv")

    if (result?.command) {
      switch (result.command) {
        case "start-chat":
          if (conv.chatbotTopic === null) {
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
            await message.say(
              this.bot.prettyQuery(
                "AI聊天",
                `已启动，当前话题：${conv.chatbotTopic}`,
                [
                  "/list-topics: 查询历史话题",
                  "/new-topic [TITLE]: 开启新话题",
                  "/stop-chat: 结束AI聊天",
                ].join("\n"),
              ),
            )
          } else {
            await message.say(ERR_MSG_INADEQUATE_PERMISSION)
          }
          break

        case "new-topic":
          if (!result.args) {
            await message.say(
              this.bot.prettyQuery("新增话题", `失败，原因：不能为空`),
            )
          } else {
            // 无法去重，因为已经入库了
            await table.update({
              where: { id: convId },
              data: {
                chatbotTopic: result.args,
              },
            })
            await message.say(
              this.bot.prettyQuery(
                "新增话题",
                `成功，当前会话为：${result.args}`,
              ),
            )
          }

          break

        case "set-topic":
          const topicDict = await listTopics(convId)

          const schema = z.union(
            // @ts-ignore
            Object.keys(topicDict).map((s: Readonly<string>) => z.literal(s)),
          ) as unknown as LiteralUnionSchema

          const choices = schema.options.map((o) => o.value)

          const target = isNumeric(result.args)
            ? choices[Number(result.args) - 1]
            : result.args

          const parsedResult = await schema.safeParseAsync(target)
          console.log({ schema, parsedResult })

          if (parsedResult.success) {
            await table.update({
              where: { id: convId },
              data: {
                chatbotTopic: target,
              },
            })
            await message.say(
              this.bot.prettyQuery(
                "话题变更",
                `修改成功，当前会话为：${target}`,
              ),
            )
          } else {
            await message.say(
              this.bot.prettyQuery(
                "话题变更",
                prettyInvalidChoice(target ?? "undefined", schema),
              ),
            )
          }

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
          const topicDictListed = await listTopics(convId)
          await message.say(
            this.bot.prettyQuery(
              "历史话题列表",
              Object.keys(topicDictListed)
                .map(
                  (k, index) =>
                    `${index + 1}. ${k} (${topicDictListed[k]}条消息)`,
                )
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
          await message.say(
            this.bot.prettyQuery(
              "AI聊天",
              "已关闭",
              ["/start-chat: 开始AI聊天", "/list-topics: 查询历史话题"].join(
                "\n",
              ),
            ),
          )
          break
      }
    }

    if (
      message.text().startsWith("/") ||
      !conv?.chatbotEnabled ||
      message.self()
    )
      return

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
