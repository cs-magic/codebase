import { Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { isTestMessage } from "../is-test-message"
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

    const roomId = message.room()?.id
    if (!(await isTestMessage(message)) || !roomId) return

    const roomInDB = await prisma.wechatRoom.findUnique({
      where: { id: roomId },
    })

    switch (result?.command) {
      case "start":
        await prisma.wechatRoom.update({
          where: { id: roomId },
          data: {
            // chatbotTopic: null,
            chatbotEnabled: true,
          },
        })
        return

      case "topic":
        await message.say(`当前话题为：${roomInDB?.chatbotTopic}`)
        return

      case "set-topic":
        await prisma.wechatRoom.update({
          where: { id: roomId },
          data: {
            chatbotTopic: result.args,
          },
        })
        return

      case "stop":
        await prisma.wechatRoom.update({
          where: { id: roomId },
          data: {
            // chatbotTopic: null,
            chatbotEnabled: false,
          },
        })
        return
    }

    if (!roomInDB?.chatbotEnabled || message.self()) return

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
