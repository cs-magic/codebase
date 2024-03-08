import { ICreateCallLLM } from "../../packages/common-llm/schema"
import { PusherServerId } from "../../packages/common-puser/config"
import { ILLMMessage } from "./message"

export type ResponseStatus =
  | "to-response"
  | "responding"
  | "responded"
  | "interrupted"
  | "unknown"

export type ISseRequest = {
  status: ResponseStatus
  pusherServerId: PusherServerId
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

export const getTriggerIdFromSseRequest = (request: ISseRequest) =>
  request.type === "app-response"
    ? `chat@${request.requestId}.${request.appId}`
    : `title@${request.convId}`

export type LlmActionPayload = { request: ISseRequest } & (
  | {
      app: ICreateCallLLM
      context: ILLMMessage[]
      llmDelay?: number
      action: "trigger"
    }
  | { action: "interrupt" }
)
