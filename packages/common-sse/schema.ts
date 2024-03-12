import { ResponseFinalStatus } from "@/schema/sse"

/**
 * 不能用 error 这是 sse 默认的 event-type
 */
export type TransEventType =
  | "init"
  | "data"
  | "error"
  | "close"
  | "onClientConnected"
  | "onClientDisconnected"

export type GenericTransEvent<T extends TransEventType, V = any> = {
  event: T
  data: V & { time?: number }
}

export type ITransEvent<T extends TransEventType = any> = T extends "init"
  ? GenericTransEvent<"init", object>
  : T extends "data"
    ? GenericTransEvent<"data", { token: string; convId?: string }>
    : T extends "error"
      ? GenericTransEvent<"error", { message: string }>
      : T extends "close"
        ? GenericTransEvent<"close", { reason: ResponseFinalStatus }>
        : T extends "onClientConnected"
          ? GenericTransEvent<"onClientConnected", { id: string }>
          : T extends "onClientDisconnected"
            ? GenericTransEvent<"onClientDisconnected", { id: string }>
            : never

export type ITransClient = {
  id: string
  onEvent: (event: ITransEvent) => void
}

export type ITransChannel = {
  events: ITransEvent[]
  clients: ITransClient[]
}
