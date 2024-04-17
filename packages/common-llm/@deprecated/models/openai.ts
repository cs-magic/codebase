"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ILlmMessage } from "@cs-magic/p01-card/src/schema/message"
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import { IterableReadableStream } from "@langchain/core/utils/stream"
import { ChatOpenAI } from "@langchain/openai"

import { ICreateCallLlm } from "../../schema/llm"

/**
 * todo: 用更好的接口，langchain 这个不太对齐（但兼容性应该是最好的）
 */
export const callChatGPT = async ({
  config,
  context,
}: {
  config: ICreateCallLlm
  context: ILlmMessage[]
}) => {
  console.log("-- GPT called: ", { config, context })

  const model = new ChatOpenAI({
    ...config,
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

export const callLLMApiMock = async ({
  config,
  context,
}: {
  config: ICreateCallLlm
  context: ILlmMessage[]
}) => {
  return new IterableReadableStream<{ content: string }>()
}
