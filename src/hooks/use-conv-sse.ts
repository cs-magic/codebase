import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { fetchSSE } from "../../packages/common-sse/fetch-sse"
import { getTriggerIdFromSseRequest, ISseRequest } from "../schema/sse"
import { stopGeneratingAtom } from "../store/app"
import { updateAppResponseAtom, updateConvTitleAtom } from "../store/conv"
import { transportTypeAtom } from "../store/query"

export const useConvSse = (request: ISseRequest) => {
  const [stoppedGenerating, stopGenerating] = useAtom(stopGeneratingAtom)

  const { status, type, pusherServerId } = request
  const [transportType] = useAtom(transportTypeAtom)

  const [, updateAppResponse] = useAtom(updateAppResponseAtom)
  const [, updateConvTitle] = useAtom(updateConvTitleAtom)
  const update = (
    func: (data: {
      tEnd: Date | null
      content: string | null
      tStart: Date | null
      error: string | null
    }) => void,
  ) => {
    if (request.type === "app-response") {
      const { requestId } = request
      if (requestId) updateAppResponse(requestId, request.appId, func)
    } else {
      const { convId } = request
      if (convId) updateConvTitle(convId, func)
    }
  }

  const onFinal = (reason: string) => {
    console.log("sse final, reason: ", reason)
    update((s) => {
      s.tEnd = new Date()
    })
    const sse = refSSE.current
    if (sse && sse.readyState !== sse.CLOSED) sse.close()
  }

  const refSSE = useRef<EventSource>()

  useEffect(() => {
    if (transportType !== "sse") return

    console.log("[sse] requesting: ", request)
    // todo: more robust lock
    if (status !== "to-response") return

    refSSE.current = fetchSSE(
      `/api/llm?r=${getTriggerIdFromSseRequest(request)}`,
      {
        onOpen: () => {
          update((s) => {
            s.tStart = new Date()
            s.content = ""
          })
        },
        onData: (data) => {
          // console.debug({ data })
          update((s) => {
            s.content += data
          })
        },
        onError: (error) => {
          update((s) => {
            s.error = error
          })
        },
        onFinal: () => onFinal("normal onFinal"),
      },
    )

    // 不能在这里清除，条件太强了，因为ok只是一个trigger
    // return () => onFinal("after hook")
  }, [status])

  useEffect(() => {
    if (stoppedGenerating) {
      onFinal("manually stopped")
      stopGenerating(false)
    }
  }, [stoppedGenerating])

  useEffect(() => {
    const f = () => onFinal("beforeunload")
    window.addEventListener("beforeunload", f)
    return () => {
      window.removeEventListener("beforeunload", f)
    }
  }, [])
}
