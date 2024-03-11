import { ICreateCallLLM } from "../../packages/common-llm/schema"

import { PusherServerId } from "../../packages/common-pusher/schema"
import { ILLMMessage } from "./message"

export type ResponseFinalStatus = "interrupted" | "responded" | "not-found"

export type ResponseStatus =
  | "unknown"
  | "to-response"
  | "responding"
  | ResponseFinalStatus

// todo: union response id
export type ILLMRequest = {
  pusherServerId?: PusherServerId
  status?: ResponseStatus
} & (
  | {
      type: "conv-title"
      convId?: string
    }
  | {
      type: "app-response"
      requestId?: string | null
      appId: string
    }
)

export const getTriggerIdFromSSERequest = (request: ILLMRequest) => {
  switch (request.type) {
    case "app-response":
      const { requestId, appId } = request
      return !!requestId && !!appId ? `chat@${requestId}.${appId}` : null

    case "conv-title":
      const { convId } = request
      return !!convId ? `title@${convId}` : null

    default:
      return null
  }
}

export type LlmActionPayload = { request: ILLMRequest } & (
  | {
      app: ICreateCallLLM
      context: ILLMMessage[]
      llmDelay?: number
      action: "trigger"
    }
  | { action: "interrupt" }
)
