import { Message } from "wechaty"
import { z } from "zod"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { loadBotDynamicContext } from "../utils/bot-context"
import { renderBotTemplate } from "../utils/bot-template"
import { getTalkerPreference } from "../utils/get-talker-preference"
import { parseCommand } from "../utils/parse-command"
import { prettyBotQuery } from "../utils/pretty-bot-query"
import { updateTalkerPreference } from "../utils/update-talker-preference"
import { BaseHandler } from "./base.handler"
import { basicCommands } from "./basic.commands"

export class BasicHandler extends BaseHandler {
  public async onMessage(message: Message) {
    const result = parseCommand<z.infer<typeof basicCommands>>(
      message.text(),
      basicCommands,
    )
    // console.log({ result })
    if (!result) return

    const talkerPreference = await getTalkerPreference(message)
    const lang = talkerPreference?.lang ?? "en"
    const dynamicContext = await loadBotDynamicContext(lang)
    const template = await renderBotTemplate(message)

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break

      case "":
      case "help":
      case "帮助":
        await message.say(
          await prettyBotQuery(
            dynamicContext.name,
            template.help,
            undefined,
            lang,
          ),
        )
        break

      case "status":
      case "状态":
        await message.say(
          await prettyBotQuery("实时状态", template.status, undefined, lang),
        )
        break

      case "list-models":
      case "查询模型列表":
        await message.say(
          await prettyBotQuery(
            `模型列表`,
            [
              ...llmModelTypeSchema.options.map(
                (o, i) => `${i + 1}. ${o.value}`,
              ),
            ].join("\n"),
            ["set-model"],
            lang,
          ),
        )
        break

      case "set-model":
      case "设置模型":
        return updateTalkerPreference(message, result, "model")

      case "set-backend":
      case "设置后端":
        return updateTalkerPreference(message, result, "backend")

      case "set-lang":
      case "设置语言":
        return updateTalkerPreference(message, result, "lang")
    }
  }
}
