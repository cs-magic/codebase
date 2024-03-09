import { IContext } from "@/schema/message"
import { partial } from "lodash"
import { callChatGPT } from "../models/openai"
import { ICallLLMConfig } from "../schema"

export const callPromptBase = async (
  config: ICallLLMConfig,
  context: IContext,
) => {
  return callChatGPT({
    config: config,
    context: config.systemPrompt
      ? [
          {
            role: "system",
            content: config.systemPrompt,
          },
          ...context,
        ]
      : context,
  })
}
