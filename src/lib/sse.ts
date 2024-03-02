import { ISSEEventType } from "@/app/api/llm/schema"

export const fetchSSE = async (
  requestUrl: string,
  options?: {
    onToken?: (token: string) => void
    onOutput?: (output: string) => void
  },
) => {
  console.log({ requestUrl })
  // console.log({ cid })
  const sse = new EventSource(requestUrl)
  /**
   * sse 要自己控制关闭，https://stackoverflow.com/a/54385424/9422455
   */

  sse.addEventListener("data" as ISSEEventType, (ev: MessageEvent<string>) => {
    const token = JSON.parse(ev.data) as string
    if (options?.onToken) options.onToken(token)

    console.log({ token })
  })

  sse.onopen = () => {
    console.log("event source opened")
  }
  sse.onerror = (err) => {
    // 2 是结束
    if (err.eventPhase !== 2) console.log(`event source error: `, err)
    else console.log("event source closed")
    sse.close()
  }

  return () => {
    sse.close()
  }
}
