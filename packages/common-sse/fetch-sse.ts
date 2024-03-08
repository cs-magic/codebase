import ansiColors from "ansi-colors"
import { ISSEEventType } from "./schema"

export const fetchSSE = (
  requestUrl: string,
  options?: {
    onOpen?: () => void
    onData?: (data: string) => void
    onError?: (data: string) => void
    onOutput?: (output: string) => void
    onFinal?: (sse: EventSource) => void
  },
) => {
  console.log(ansiColors.bgRed.white(`fetching SSE: ${requestUrl}`))

  /**
   * sse 要自己控制关闭，https://stackoverflow.com/a/54385424/9422455
   */
  const sse = new EventSource(requestUrl)

  const doEnd = () => {
    if (options?.onFinal) options.onFinal(sse)
    sse.close()
  }

  sse.addEventListener(
    "onData" as ISSEEventType,
    (ev: MessageEvent<string>) => {
      if (options?.onData) options.onData(JSON.parse(ev.data) as string)
    },
  )
  sse.addEventListener(
    "onError" as ISSEEventType,
    (ev: MessageEvent<string>) => {
      if (options?.onError) options.onError(JSON.parse(ev.data) as string)

      doEnd()
    },
  )

  sse.onopen = () => {
    if (options?.onOpen) options.onOpen()
    // console.log("event source opened")
  }
  sse.onerror = (err) => {
    // 2 是结束
    // if (err.eventPhase !== 2) console.log(`event source error: `, err)
    // else console.log("event source closed")

    doEnd()
  }

  return sse
}
