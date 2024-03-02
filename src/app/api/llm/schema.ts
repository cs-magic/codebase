export type IClient = {
  onEvent: (event: ISSEEvent) => Promise<void>
}
export type IRequest = {
  data: ISSEEvent[]
  finished: boolean
  clients: IClient[]
}

export type ISSEEventType = "data" | "close"

export type ISSEEvent<T extends ISSEEventType = any> = T extends "data"
  ? {
      event: "data"
      data: string
    }
  : {
      event: "close"
    }
