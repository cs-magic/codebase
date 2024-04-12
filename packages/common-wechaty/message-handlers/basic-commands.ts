import { type MessageInterface } from "wechaty/impls"
import { isNumeric } from "../../common-common/is-numeric"
import {
  backendEngineTypeSchema,
  BackendType,
} from "../../common-llm/schema/llm"
import {
  LlmModelType,
  llmModelTypeSchema,
} from "../../common-llm/schema/providers"
import { getConv } from "../utils/get-conv"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { z } from "zod"

export const basicSchema = z.union([
  z.literal("ding"),
  z.literal(""),
  z.literal("help"),
  z.literal("status"),
  z.literal("list-models"),
  z.literal("set-model"),
  z.literal("set-backend"),
])

export class BasicCommandsMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const result = parseCommand<z.infer<typeof basicSchema>>(
      message.text(),
      basicSchema,
    )
    if (!result) return

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break

      case "":
      case "help":
        await message.say(
          this.bot.prettyQuery(
            `${this.bot.context.name}快捷帮助`,
            this.bot.template().help,
          ),
        )
        break

      case "status":
        const conv = await getConv(message)
        await message.say(
          this.bot.prettyQuery(
            "实时状态",
            this.bot.template({
              conv: {
                uniChatterEnabled: !!conv!.chatbotEnabled,
                uniParserEnabled: !!conv!.uniParserEnabled,
              },
            }).status,
          ),
        )
        break

      case "list-models":
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
        await this.handleCommand(
          message,
          "model",
          llmModelTypeSchema,
          (isNumeric(result.args)
            ? llmModelTypeSchema.options.map((o) => o.value)[
                Number(result.args) - 1
              ]
            : result.args) as LlmModelType,
        )
        break

      case "set-backend":
        await this.handleCommand(
          message,
          "backend",
          backendEngineTypeSchema,
          result.args as BackendType,
        )
        break
    }
  }
}
