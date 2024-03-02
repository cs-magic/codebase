"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ChatOpenAI } from "@langchain/openai"

export const callChatGPT = async ({
  prompt,
  modelId,
  temperature = 0.9,
}: {
  prompt: string
  modelId: string // https://github.com/openai/openai-python/issues/952#issuecomment-1857207339
  temperature?: number
}) => {
  const model = new ChatOpenAI({
    modelName: modelId, // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature,

    timeout: 3000,
  })
  return model.stream(prompt)
}
