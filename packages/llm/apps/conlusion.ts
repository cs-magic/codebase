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

/**
 * ref: https://stackoverflow.com/a/71882569/9422455
 */
export const callConclusion = partial(callPromptBase, {
  systemPrompt:
    "以下是我与你的一段对话，请做一个简要的总结（要求：不超过10个字）",
  modelName: "gpt-3.5-turbo",
})
