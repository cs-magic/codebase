export type IClient = {
  id: string
  onEvent: (event: ISseEvent) => void
  // onEvent: (event: ISSEEvent) => Promise<void>
}
export type ISseTrigger = {
  // response: Prisma.ResponseUncheckedCreateInput
  events: ISseEvent[]
  clients: IClient[]
}
/**
 * 不能用 error 这是 sse 默认的 event-type
 */
export type SseEventType =
  | "init"
  | "data"
  | "error"
  | "close"
  | "onClientConnected"
  | "onClientDisconnected"

export type GenericSseEvent<T extends SseEventType, V = any> = {
  event: T
  data?: V
}

export type ISseEvent =
  | GenericSseEvent<"init", { time: number }>
  | GenericSseEvent<"data", string>
  | GenericSseEvent<"error", string>
  | GenericSseEvent<"close", string>
  | GenericSseEvent<"onClientConnected", { id: string }>
  | GenericSseEvent<"onClientDisconnected", { id: string }>
