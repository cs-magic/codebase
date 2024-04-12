import { type MessageInterface } from "wechaty/impls"
import { z } from "zod"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { basicSchema } from "./basic-commands"
import { uniChatterSchema } from "./uni-chatter"
import { uniParserSchema } from "./uni-parser"

export class ValidatorMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const text = message.text()

    if (text.trim().startsWith("/")) {
      const result = parseCommand(
        message.text(),
        z.union([
          ...basicSchema.options,
          ...uniChatterSchema.options,
          ...uniParserSchema.options,
        ]),
      )

      if (!result) {
        throw new Error(
          `无效的命令：${text}，仅支持：\n${[
            basicSchema,
            uniChatterSchema,
            uniParserSchema,
          ]
            .map((s) => s.options.map((o) => `/${o.value}`))
            .flat()
            .join("\n")}`,
        )
      }
    }
  }
}
