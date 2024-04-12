import { type MessageInterface } from "wechaty/impls"
import { z } from "zod"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { basicSchema } from "./basic-commands"
import { heartbeatSchema } from "./heartbeat"
import { uniChatterSchema } from "./uni-chatter"

export class ValidatorMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const text = message.text()

    if (text.trim().startsWith("/")) {
      const result = parseCommand(
        message.text(),
        z.union([
          ...basicSchema.options,
          ...heartbeatSchema.options,
          ...uniChatterSchema.options,
        ]),
      )

      if (!result) {
        throw new Error(`无效的命令：${text}`)
      }
    }
  }
}
