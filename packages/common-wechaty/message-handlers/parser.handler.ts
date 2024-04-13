import { Message } from "wechaty"
import { z } from "zod"
import { parseCommand } from "../utils/parse-command"
import { BaseHandler } from "./base.handler"
import { parserCommands } from "./parser.commands"
import { ParserManager } from "./parser.manager"

export class ParserHandler extends BaseHandler {
  async onMessage(message: Message): Promise<void> {
    const parserManager = new ParserManager(
      "万能解析器",
      message,
      this.bot.wxid,
    )

    const result = parseCommand<z.infer<typeof parserCommands>>(
      message.text(),
      parserCommands,
    )
    if (!result) await parserManager.safeParseCard()

    switch (result?.command) {
      case "enable-parser":
        return parserManager.enableParser()

      case "disable-parser":
        return parserManager.disableParser()
    }
  }
}
