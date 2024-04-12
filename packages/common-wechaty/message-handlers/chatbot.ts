import { Prisma } from "@prisma/client"
import { Message } from "wechaty"
import {
  ERR_MSG_INADEQUATE_PERMISSION,
  ERR_MSG_SUCCESS,
} from "../../common-common/messages"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { isSenderAdmin } from "../is-sender-admin"
import { parseCommand } from "../parse-command"
import { IBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class ChatbotMessageHandler extends BaseMessageHandler<IBotContext> {
  name = "chatbot"

  public async onMessage(message: Message) {
    const result = parseCommand(message.text(), [
      "start",
      "topic",
      "list-topics",
      "new-topic",
      "select-topic",
      "stop",
    ])

    const table = prisma[
      message.room() ? "wechatRoom" : "wechatUser"
    ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate

    const convId = message.conversation().id

    const findRow = table.findUnique({
      where: { id: convId },
    })

    switch (result?.command) {
      case "start":
        if (isSenderAdmin(message)) {
          await table.update({
            where: { id: convId },
            data: {
              // chatbotTopic: null,
              chatbotEnabled: true,
            },
          })
          await message.say(ERR_MSG_SUCCESS)
        } else {
          await message.say(ERR_MSG_INADEQUATE_PERMISSION)
        }

        return

      case "topic":
        await message.say(
          `当前话题为：${(await findRow)?.chatbotTopic ?? "暂无"}`,
        )
        return

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
          orderBy: { id: "asc" },
        })
        const topicDict: Record<string, number> = {}
        const DEFAULT = "默认"
        let lastTopic = DEFAULT
        messages.forEach((row) => {
          const parsed = parseCommand(row.text ?? "", ["set-topic"])
          if (!parsed) {
            ++topicDict[lastTopic]
          } else {
            switch (parsed?.command) {
              case "set-topic":
                lastTopic = parsed?.args ?? DEFAULT
                if (!(lastTopic in topicDict)) topicDict[lastTopic] = 0
                break
            }
          }
        })
        await message.say(
          [
            `# 历史话题`,
            "---",
            ...Object.keys(topicDict).map(
              (k, index) => `${index + 1}. ${k} (${topicDict[k]})`,
            ),
            "---",
            "您可以 「/select-topic [序号]」 继续某个话题，或者 「/new-topic [名称]」 开启新话题",
          ].join("\n"),
        )
        return

      case "new-topic":
        await table.update({
          where: { id: convId },
          data: {
            chatbotTopic: result.args,
          },
        })
        await message.say(`[NEW-TOPIC-SET] ${result.args}`)
        return

      case "stop":
        await table.update({
          where: { id: convId },
          data: {
            // chatbotTopic: null,
            chatbotEnabled: false,
          },
        })
        await message.say(ERR_MSG_SUCCESS)
        return
    }

    if (!(await findRow)?.chatbotEnabled || message.self()) return

    /**
     * 1.        -->     Q: /start --> ok --> Q: ...
     * 2. Q: ... --> Q: /set-topic --> ok --> Q: ...
     */

    const res = await callLLM({
      messages: [
        {
          role: "user",
          content: message.text(),
        },
      ],
      model: this.context.summaryModel,
    })
    const content = res.response?.choices[0]?.message.content
    if (!content) throw new Error("LLM return nothing")
    await message.say(content)

    return true
  }
}
