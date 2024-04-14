import { type MessageInterface } from "wechaty/impls"
import { parseCommand } from "../../utils/parse-command"
import { parseAsyncWithFriendlyErrorMessage } from "../../utils/validate-input"
import { messageHandlerSchema } from "../_all"
import { BaseHandler } from "./base.handler"

export class ValidatorHandler extends BaseHandler {
  public async onMessage(message: MessageInterface) {
    const text = message.text()

    if (text.trim().startsWith("/")) {
      const result = parseCommand(text, messageHandlerSchema)
      if (!result) {
        await parseAsyncWithFriendlyErrorMessage(messageHandlerSchema, text)
      }
    }
  }
}
