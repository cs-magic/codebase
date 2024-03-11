import { ResponseFinalStatus } from "@/schema/sse"

/**
 * 不能用 error 这是 sse 默认的 event-type
 */
export type SSEEventType =
  | "init"
  | "data"
  | "error"
  | "close"
  | "onClientConnected"
  | "onClientDisconnected"

export type GenericSSEEvent<T extends SSEEventType, V = any> = {
  event: T
  data: V & { time?: number }
}

export type ISSEEvent<T extends SSEEventType = any> = T extends "init"
  ? GenericSSEEvent<"init", object>
  : T extends "data"
    ? GenericSSEEvent<"data", { token: string }>
    : T extends "error"
      ? GenericSSEEvent<"error", { message: string }>
      : T extends "close"
        ? GenericSSEEvent<"close", { reason: ResponseFinalStatus }>
        : T extends "onClientConnected"
          ? GenericSSEEvent<"onClientConnected", { id: string }>
          : T extends "onClientDisconnected"
            ? GenericSSEEvent<"onClientDisconnected", { id: string }>
            : never

export type ISSEClient = {
  id: string
  onEvent: (event: ISSEEvent) => void
}

export type ISSETrigger = {
  events: ISSEEvent[]
  clients: ISSEClient[]
}
