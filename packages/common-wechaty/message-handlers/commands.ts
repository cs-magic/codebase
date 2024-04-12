import { MessageInterface } from "wechaty/impls"
import { isNumeric } from "../../common-common/is-numeric"
import { QUERY_SEPARATOR } from "../../common-common/pretty-query"
import { backendEngineTypeSchema } from "../../common-llm/schema/llm"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"

export class CommandsMessageHandler extends BaseMessageHandler {
  name = "commands"

  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), [
      "",
      "help",
      "status",
      "list-models",
      "set-model",
      "set-backend",
    ])
    if (!result) return

    switch (result.command) {
      case "":
      case "help":
        await message.say(
          this.prettyBotQuery(
            `${this.bot.context!.name}快捷帮助`,
            this.template.help,
          ),
        )
        break

      case "status":
        await message.say(this.prettyBotQuery("实时状态", this.template.status))
        break

      case "list-models":
        await message.say(
          this.prettyBotQuery(
            `模型列表`,
            [
              ...llmModelTypeSchema.options.map(
                (o, i) => `${i + 1}. ${o.value}`,
              ),
              QUERY_SEPARATOR,
              "TIPS:",
              "/set-model [N]: 设置模型",
            ].join("\n"),
          ),
        )
        break

      case "set-model":
        return this.handleCommand(
          message,
          "model",
          llmModelTypeSchema,
          isNumeric(result.args)
            ? llmModelTypeSchema.options.map((o) => o.value)[
                Number(result.args) - 1
              ]
            : result.args,
        )

      case "set-backend":
        return this.handleCommand(
          message,
          "backend",
          backendEngineTypeSchema,
          result.args,
        )
    }

    return true
  }
}
