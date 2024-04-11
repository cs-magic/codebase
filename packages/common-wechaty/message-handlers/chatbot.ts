import { MessageInterface } from "wechaty/impls"
import { prisma } from "../../common-db/providers/prisma"
import { isTestMessage } from "../is-test-message"
import { parseCommand } from "../parse-command"
import { IBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class ChatbotMessageHandler extends BaseMessageHandler<IBotContext> {
  name = "chatbot"

  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), ["topic", "set-topic"])
    if (!result) return

    const roomId = message.room()?.id
    if (!(await isTestMessage(message)) || !roomId) return

    switch (result.command) {
      case "topic":
        const roomInDB = await prisma.wechatRoom.findUnique({
          where: { id: roomId },
        })
        await message.say(`当前话题为：${roomInDB?.chatbotTopic}`)
        return

      case "set-topic":
        return
    }

    return true
  }
}
