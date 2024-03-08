export type ResponseStatus =
  | "to-response"
  | "responding"
  | "responded"
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
