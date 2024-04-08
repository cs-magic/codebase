"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ILLMMessage } from "@/schema/message"
import { IterableReadableStream } from "@langchain/core/utils/stream"
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import { ChatOpenAI } from "@langchain/openai"
import OpenAI from "openai"
import { ICallLLMOptions } from "../agents/call-agent"

import { ICreateCallLLM } from "../schema/call-llm"

export const callChatGPTV2 = async (options: ICallLLMOptions) => {
  const baseURL = options.model?.startsWith("moonshot")
    ? "https://api.moonshot.cn/v1"
    : undefined

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
    baseURL,
  })
  const chatCompletion = await client.chat.completions.create({
    messages: options.messages ?? [],
    model: options.model ?? "gpt-3.5-turbo",
  })
  return chatCompletion.choices[0]?.message.content
}

/**
 * todo: 用更好的接口，langchain 这个不太对齐（但兼容性应该是最好的）
 */
export const callChatGPT = async ({
  config,
  context,
}: {
  config: ICreateCallLLM
  context: ILLMMessage[]
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
  config: ICreateCallLLM
  context: ILLMMessage[]
}) => {
  return new IterableReadableStream<{ content: string }>()
}
