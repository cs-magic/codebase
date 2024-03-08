import { ICreateCallLLM } from "../../packages/common-llm/schema"
import { PusherServerId } from "../../packages/common-puser/config"
import { ILLMMessage } from "./message"

export type ResponseFinalStatus = "interrupted" | "responded" | "not-found"

export type ResponseStatus =
  | "unknown"
  | "to-response"
  | "responding"
  | ResponseFinalStatus

export type ILLMRequest = {
  pusherServerId?: PusherServerId
  status?: ResponseStatus
} & (
  | {
      type: "conv-title"
      convId?: string
    }
  | {
      requestId?: string
      type: "app-response"
      appId: string
    }
)

export const getTriggerIdFromSseRequest = (request: ILLMRequest) =>
  request.type === "app-response"
    ? `chat@${request.requestId}.${request.appId}`
    : `title@${request.convId}`

export type LlmActionPayload = { request: ILLMRequest } & (
  | {
      app: ICreateCallLLM
      context: ILLMMessage[]
      llmDelay?: number
      action: "trigger"
    }
  | { action: "interrupt" }
)
