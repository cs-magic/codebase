import { Message } from "wechaty"
import { z } from "zod"
import { getConvPreference } from "../../utils/get-conv-preference"
import { parseCommand } from "../../utils/parse-command"
import { BaseHandler } from "./base.handler"
import { parserCommands } from "./parser.commands"
import { ParserManager } from "./parser.manager"

export class ParserHandler extends BaseHandler {
  async onMessage(message: Message): Promise<void> {
    const preference = await getConvPreference(message)
    const title = preference.lang === "zh" ? "万能解析器" : "Super Parser"
    const manager = new ParserManager(this.bot, title, message)

    const result = parseCommand<z.infer<typeof parserCommands>>(
      message.text(),
      parserCommands,
    )
    if (!result) await manager.safeParseCard()

    switch (result?.command) {
      case "enable-parser":
        return manager.enableParser()

      case "disable-parser":
        return manager.disableParser()
    }
  }
}
