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
export type ISSEEventType = "onInit" | "onData" | "onError" | "close"
export type ISseEvent<T extends ISSEEventType = any> = T extends "onInit"
  ? { event: "onInit"; data?: string }
  : T extends "onData"
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
          data?: string
        }
