import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { fetchSSE } from "../../packages/common-sse/fetch-sse"
import { ISseRequest } from "../schema/sse"
import { stopGeneratingAtom } from "../store/app"
import { updateAppResponseAtom, updateConvTitleAtom } from "../store/conv"
import { getTriggerID } from "../utils"

export const useConvSse = (data: ISseRequest) => {
  const [stoppedGenerating, stopGenerating] = useAtom(stopGeneratingAtom)
  const [, updateAppResponse] = useAtom(updateAppResponseAtom)
  const [, updateConvTitle] = useAtom(updateConvTitleAtom)

  const { convId, status, requestId } = data

  const update = (
    func: (data: {
      tEnd: Date | null
      content: string | null
      tStart: Date | null
      error: string | null
    }) => void,
  ) => {
    if (!requestId || !convId) return
    if (data.type === "app-response")
      updateAppResponse(requestId, data.appId, func)
    else updateConvTitle(convId, func)
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

  const ok = status === "to-response" && !!requestId && !!convId
  useEffect(() => {
    const color = ok ? ansiColors.red : ansiColors.gray
    console.log(color("[sse] requesting: "), { ...data, ok })
    if (!ok) return

    refSSE.current = fetchSSE(
      `/api/llm?r=${getTriggerID(requestId, data.type === "app-response" ? data.appId : convId)}`,
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
  }, [ok])

  useEffect(() => {
    // onFinal("request id changed")
  }, [requestId])

  useEffect(() => {
    onFinal("conv id changed")
  }, [convId])

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
