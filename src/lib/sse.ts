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
  sse.addEventListener("token", (ev: MessageEvent<string>) => {
    const token = JSON.parse(ev.data) as string
    if (options?.onToken) options.onToken(token)

    console.log({ token })
  })
  sse.onopen = () => {
    console.log("event source opened")
  }
  sse.onerror = (err) => {
    console.log("event source error: ", err)
    sse.close()
  }
  return () => {
    console.log("event source close")
    sse.close()
  }
}
