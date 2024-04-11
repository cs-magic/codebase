import { MessageInterface } from "wechaty/impls"

import { backendEngineTypeSchema } from "../../common-llm/schema/llm"
import { llmModelTypeSchema } from "../../common-llm/schema/providers"
import { parseCommand } from "../parse-command"
import { IBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class SuperCommandsMessageHandler extends BaseMessageHandler<IBotContext> {
  name = "super-commands"

  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), [
      "set-backend-engine-type",
      "set-summary-model",
    ])
    if (!result) return

    switch (result.command) {
      case "set-backend-engine-type":
        return this.handleCommand(
          message,
          "backendEngineType",
          backendEngineTypeSchema,
          result.args,
        )

      case "set-summary-model":
        return this.handleCommand(
          message,
          "summaryModel",
          llmModelTypeSchema,
          result.args,
        )
    }

    return true
  }
}
