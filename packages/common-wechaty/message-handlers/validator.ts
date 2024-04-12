import { type MessageInterface } from "wechaty/impls"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"

export class ValidatorMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const text = message.text()

    if (text.trim().startsWith("/")) {
      // todo: generic type
      const result = parseCommand(message.text(), [
        // heartbeat
        "ding",

        // basic
        "",
        "help",
        "status",
        "list-models",
        "set-model",
        "set-backend",

        // chatbot
        "start-chat",
        "stop-chat",
        "topic",
        "list-topics",
        "new-topic",
        "set-topic",
      ])

      if (!result) {
        throw new Error(`无效的命令：${text}`)
      }
    }
  }
}
