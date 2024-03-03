"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ChatOpenAI } from "@langchain/openai"
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import { ILLMMessage } from "@/schema/core/message"

export const callChatGPT = async ({
  modelId,
  temperature = 0.9,
  messages,
}: {
  modelId: string // https://github.com/openai/openai-python/issues/952#issuecomment-1857207339
  temperature?: number
  messages: ILLMMessage[]
}) => {
  const model = new ChatOpenAI({
    modelName: modelId, // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature,

    timeout: 3000,
  })
  return model.stream(
    messages.map((m) => {
      // ref: https://js.langchain.com/docs/modules/model_io/chat/quick_start#messages
      const Message =
        m.role === "system"
          ? SystemMessage
          : m.role === "user"
            ? HumanMessage
            : AIMessage
      return new Message(m.content)
    }),
  )
}
