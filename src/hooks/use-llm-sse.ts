import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { fetchSSE } from "../../packages/common-sse/core"
import { transportTypeAtom } from "../../packages/common-transport/store"
import { getChannelIdFomRequest, ILLMRequest } from "../schema/sse"
import { coreStore } from "../store/core.valtio"

import { appStopGeneratingScopeAtom } from "../store/system.atom"

/**
 * todo: not clean
 * @param request
 */
export const useLLMSSE = (request?: ILLMRequest | null) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [stoppedGenerating, stopGenerating] = useAtom(
    appStopGeneratingScopeAtom,
  )

  const update = (
    func: (data: {
      content?: string | null
      tEnd?: Date | null
      tStart?: Date | null
      error?: string | null
    }) => void,
  ) => {
    if (!request) return

    if (request.type === "app-response") {
      const { requestId } = request
      if (requestId) coreStore.updateChat(requestId, request.appId, func)
    } else {
      const { convId } = request
      if (!convId) return
      coreStore.updateConvTitle(convId, func)
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
    if (transportType !== "sse" || !request) return

    console.log("[sse] requesting: ", request)
    // todo: more robust lock
    if (request.status !== "to-response") return

    refSSE.current = fetchSSE(`/api/llm?r=${getChannelIdFomRequest(request)}`, {
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
    })

    // 不能在这里清除，条件太强了，因为ok只是一个trigger
    // return () => onFinal("after hook")
  }, [request?.status])

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
