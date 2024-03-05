import { Prisma } from "@prisma/client"

export type IClient = {
  id: string
  onEvent: (event: ISSEEvent) => Promise<void>
}
export type ISSERequest = {
  response: Prisma.ResponseUncheckedCreateInput
  clients: IClient[]
}
/**
 * 不能用 error 这是 sse 默认的 event-type
 */
export type ISSEEventType = "onData" | "onError" | "close"
export type ISSEEvent<T extends ISSEEventType = any> = T extends "onData"
  ? {
      event: "onData"
      data: string
    }
  : T extends "onError"
    ? {
        event: "onError"
        data: string
      }
    : {
        event: "close"
      }
