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
      convId: string
      userId: string
    }
  | {
      type: "app-response"
      requestId: string
      appId: string
    }
)

export const getChannelIdFomRequest = (request: ILLMRequest) => {
  switch (request.type) {
    case "app-response":
      const { requestId, appId } = request
      return !!requestId && !!appId ? `chat@${requestId}.${appId}` : null

    case "conv-title":
      const { convId, userId } = request
      // 之所以频道不考虑convId，是因为要支持用户在global级别监听，convId作为参数在消息条里
      return !!convId ? `title@${userId}` : null

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
