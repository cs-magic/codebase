import OpenAI from "openai"
import { ILlmMessage } from "./llm.base"
import { LlmModelType } from "./llm.models"

export type ILlmReq = {
  model: LlmModelType
  messages: ILlmMessage[]
  temperature?: number
  topP?: number
  stream?: boolean
}

export type ILlmRes = {
  options: ILlmReq
  query: {
    id: string
    start: number
    end?: number
    success: boolean
  }
  response?: OpenAI.Chat.Completions.ChatCompletion
  error?: string
}

export type IAgentReq = {
  name?: string
  author?: string
  version?: string
  model?: LlmModelType
  total_tokens?: number // 8912
  system_prompt?: string
  temperature?: number
  top_p?: number
}
