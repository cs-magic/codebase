import { ISSEEventType } from "./schema"

export const fetchSSE = async (
  requestUrl: string,
  options?: {
    onOpen?: () => void
    onData?: (data: string) => void
    onError?: (data: string) => void
    onOutput?: (output: string) => void
    onFinal?: () => void
  },
) => {
  console.log({ requestUrl })
  // console.log({ cid })
  const sse = new EventSource(requestUrl)
  /**
   * sse 要自己控制关闭，https://stackoverflow.com/a/54385424/9422455
   */

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
    },
  )

  sse.onopen = () => {
    if (options?.onOpen) options.onOpen()
    console.log("event source opened")
  }
  sse.onerror = (err) => {
    // 2 是结束
    if (err.eventPhase !== 2) console.log(`event source error: `, err)
    else console.log("event source closed")
    sse.close()
    if (options?.onFinal) options.onFinal()
  }

  return () => {
    if (options?.onFinal) options.onFinal()
    sse.close()
  }
}
