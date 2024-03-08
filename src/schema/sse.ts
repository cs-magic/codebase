import { ICreateCallLLM } from "../../packages/common-llm/schema"
import { ILLMMessage } from "./message"

export type ResponseStatus =
  | "to-response"
  | "responding"
  | "responded"
  | "interrupted"
  | "unknown"

export type ISseRequest = {
  convId?: string
  status: ResponseStatus
  requestId?: string
} & (
  | {
      type: "conv-title"
    }
  | {
      type: "app-response"
      appId: string
    }
)

export type LlmActionPayload = { request: ISseRequest } & (
  | {
      app: ICreateCallLLM
      context: ILLMMessage[]
      llmDelay?: number
      action: "trigger"
    }
  | { action: "interrupt" }
)
