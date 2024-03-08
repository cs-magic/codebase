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
export type ISseEventType = "init" | "data" | "error" | "close"

export type ISseEvent =
  | { event: "init"; data?: string }
  | { event: "data"; data: string }
  | { event: "error"; data: string }
  | { event: "close"; data?: string }
