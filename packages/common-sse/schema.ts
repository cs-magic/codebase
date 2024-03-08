import { ResponseFinalStatus } from "@/schema/sse"

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
  data: V & { time?: number }
}

export type ISseEvent<T extends SseEventType = any> = T extends "init"
  ? GenericSseEvent<"init", object>
  : T extends "data"
    ? GenericSseEvent<"data", { token: string }>
    : T extends "error"
      ? GenericSseEvent<"error", { message: string }>
      : T extends "close"
        ? GenericSseEvent<"close", { reason: ResponseFinalStatus }>
        : T extends "onClientConnected"
          ? GenericSseEvent<"onClientConnected", { id: string }>
          : T extends "onClientDisconnected"
            ? GenericSseEvent<"onClientDisconnected", { id: string }>
            : never
