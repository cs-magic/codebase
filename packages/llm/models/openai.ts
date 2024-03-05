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
import { ILLMMessage } from "@/schema/message"
import { App } from ".prisma/client"

/**
 * todo: 用更好的接口，langchain 这个不太对齐（但兼容性应该是最好的）
 */
export const callChatGPT = async ({
  app,
  context,
}: {
  app: App
  context: ILLMMessage[]
}) => {
  const model = new ChatOpenAI({
    modelName: app.modelName,
    user: app.user ?? undefined,
    openAIApiKey: app.openAIApiKey ?? undefined,
    temperature: app.temperature ?? undefined,
    maxTokens: app.maxTokens ?? undefined,
    topP: app.topP ?? undefined,
    frequencyPenalty: app.frequencyPenalty ?? undefined,
    presencePenalty: app.presencePenalty ?? undefined,
    n: app.n ?? undefined,
    streaming: app.streaming ?? undefined,
    timeout: app.timeout ?? undefined,
    stop: app.stop ?? undefined,
  })
  return model.stream(
    context.map((m) => {
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
