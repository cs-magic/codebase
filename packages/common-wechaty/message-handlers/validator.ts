import { type MessageInterface } from "wechaty/impls"
import { z } from "zod"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { basicSchema } from "./basic-commands"
import { taskManagerSchema } from "./task-manager"
import { uniChatterSchema } from "./uni-chatter"
import { uniParserSchema } from "./uni-parser"

const schemas = [
  basicSchema,
  uniChatterSchema,
  uniParserSchema,
  taskManagerSchema,
]
export class ValidatorMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const text = message.text()

    if (text.trim().startsWith("/")) {
      const result = parseCommand(
        message.text(),
        // @ts-ignore
        z.union(schemas.map((s) => s.options).flat()),
      )

      if (!result) {
        throw new Error(
          `无效的命令：${text}，仅支持：\n${schemas
            .map((s) => s.options.map((o) => `/${o.value}`))
            .flat()
            .join("\n")}`,
        )
      }
    }
  }
}
