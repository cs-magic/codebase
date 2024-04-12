import { MessageInterface } from "wechaty/impls"
import { backendEngineTypeSchema } from "../../common-llm/schema/llm"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { getBotConfig } from "../get-bot-config"
import { parseCommand } from "../parse-command"
import { prettyBotQuery } from "../pretty-bot-query"
import { IBotContext, loadBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class CommandsMessageHandler extends BaseMessageHandler<IBotContext> {
  name = "commands"

  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), [
      "",
      "help",
      "status",
      "list-models",
      "set-model",
      "set-backend-engine-type",
    ])
    if (!result) return

    const config = await getBotConfig({})

    switch (result.command) {
      case "":
      case "help":
        const botContext = await loadBotContext()
        await message.say(
          await prettyBotQuery(`${botContext.name}快捷帮助`, [config.help]),
        )
        break

      case "status":
        await message.say(await prettyBotQuery("实时状态", [config.status]))
        break

      case "list-models":
        await message.say(
          await prettyBotQuery(`模型列表`, [
            llmModelTypeSchema.options
              .map((o, i) => `${i + 1}. ${o.value}`)
              .join("\n"),
          ]),
        )
        break

      case "set-model":
        return this.handleCommand(
          message,
          "model",
          llmModelTypeSchema,
          result.args,
        )

      case "set-backend-engine-type":
        return this.handleCommand(
          message,
          "backendEngineType",
          backendEngineTypeSchema,
          result.args,
        )
    }

    return true
  }
}
