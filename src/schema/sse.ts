import { ICreateCallLLM } from "../../packages/common-llm/schema"

import { PusherServerId } from "../../packages/common-pusher/schema"
import { ILLMMessage } from "./message"

export type ResponseFinalStatus = "interrupted" | "responded" | "not-found"

export type ResponseStatus =
  | "unknown"
  | "to-response"
  | "responding"
  | ResponseFinalStatus

export type ILLMPusherListener = { pusherServerId?: PusherServerId } & (
  | {
      type: "conv-title"
      userId: string
    }
  | {
      type: "app-response"
      requestId: string
      appId: string
    }
)

// todo: union response id
export type ILLMRequest = {
  pusherServerId?: PusherServerId
  status?: ResponseStatus
} & (
  | {
      type: "conv-title"
      userId: string
      convId: string
    }
  | {
      type: "app-response"
      requestId: string
      appId: string
    }
)

export const getChannelIdFomRequest = (request: ILLMPusherListener) => {
  switch (request.type) {
    case "app-response":
      const { requestId, appId } = request
      return !!requestId && !!appId ? `chat@${requestId}.${appId}` : null

    case "conv-title":
      const { userId } = request
      // 之所以频道不考虑convId，是因为要支持用户在global级别监听，convId作为参数在消息条里
      return `title@${userId}`

    default:
      return null
  }
}

export type LLMActionPayload = { request: ILLMRequest } & (
  | {
      app: ICreateCallLLM
      context: ILLMMessage[]
      llmDelay?: number
      action: "trigger"
    }
  | { action: "interrupt" }
)
