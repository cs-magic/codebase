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
      "set-topic",
      "stop",
    ])

    const table = prisma[message.room() ? "wechatRoom" : "wechatUser"]

    const convId = message.conversation().id

    // @ts-ignore
    const row = await table.findUnique({
      where: { id: convId },
    })

    switch (result?.command) {
      case "start":
        if (isSenderAdmin(message)) {
          await row.update({
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
        await message.say(`当前话题为：${row?.chatbotTopic}`)
        return

      case "set-topic":
        await row.update({
          where: { id: convId },
          data: {
            chatbotTopic: result.args,
          },
        })
        await message.say(ERR_MSG_SUCCESS)
        return

      case "stop":
        await row.update({
          where: { id: convId },
          data: {
            // chatbotTopic: null,
            chatbotEnabled: false,
          },
        })
        await message.say(ERR_MSG_SUCCESS)
        return
    }

    if (!row?.chatbotEnabled || message.self()) return

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
