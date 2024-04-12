import { type MessageInterface } from "wechaty/impls"
import { z } from "zod"
import {
  backendEngineTypeSchema,
  langSchema,
} from "../../common-llm/schema/llm"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { loadBotDynamicContext } from "../utils/bot-context"
import { renderBotTemplate } from "../utils/bot-template"
import { getConv } from "../utils/get-conv"
import { getTalkerPreference } from "../utils/get-talker-preference"
import { parseCommand } from "../utils/parse-command"
import { updateTalkerPreference } from "../utils/update-talker-preference"
import { BaseMessageHandler } from "./_base"

export const basicSchema = z.union([
  z.literal(""),
  z.literal("ding"),
  z.literal("help"),
  z.literal("帮助"),
  z.literal("status"),
  z.literal("状态"),
  z.literal("list-models"),
  z.literal("查询模型列表"),
  z.literal("set-model"),
  z.literal("设置模型"),
  z.literal("set-backend"),
  z.literal("设置后端"),
  z.literal("set-lang"),
  z.literal("设置语言"),
])

export class BasicCommandsMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const result = parseCommand<z.infer<typeof basicSchema>>(
      message.text(),
      basicSchema,
    )
    if (!result) return

    const talkerPreference = await getTalkerPreference(message)
    const lang = talkerPreference?.lang ?? "en"
    const dynamicContext = await loadBotDynamicContext(lang)
    const template = await renderBotTemplate({ lang })

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break

      case "":
      case "help":
      case "帮助":
        await message.say(
          this.bot.prettyQuery(dynamicContext.name, template.help),
        )
        break

      case "status":
      case "状态":
        const conv = await getConv(message)
        await message.say(this.bot.prettyQuery("实时状态", template.status))
        break

      case "list-models":
      case "查询模型列表":
        await message.say(
          this.bot.prettyQuery(
            `模型列表`,
            [
              ...llmModelTypeSchema.options.map(
                (o, i) => `${i + 1}. ${o.value}`,
              ),
            ].join("\n"),
            ["/set-model [N]: 设置模型"].join("\n"),
          ),
        )
        break

      case "set-model":
      case "设置模型":
        return updateTalkerPreference(
          message,
          result,
          "model",
          llmModelTypeSchema,
        )

      case "set-backend":
      case "设置后端":
        return updateTalkerPreference(
          message,
          result,
          "backend",
          backendEngineTypeSchema,
        )

      case "set-lang":
      case "设置语言":
        return updateTalkerPreference(message, result, "lang", langSchema)
    }
  }
}
