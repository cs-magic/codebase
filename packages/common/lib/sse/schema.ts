export type IClient = {
  onEvent: (event: ISSEEvent) => Promise<void>
}
export type IRequest = {
  data: ISSEEvent[]
  finished: boolean
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
