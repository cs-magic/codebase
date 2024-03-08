import { useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { fetchSSE } from "../../packages/common-sse/fetch-sse"
import { IUpdateResponse } from "../schema/conv"
import { stopGeneratingAtom } from "../store/app"
import {
  checkRespondingAtom,
  requestIdAtom,
  updateResponseAtom,
} from "../store/conv"
import { getTriggerID } from "../utils"

export const useConvAppSse = (appId: string) => {
  const [checkResponding] = useAtom(checkRespondingAtom)
  const [, updateResponse] = useAtom(updateResponseAtom)
  const [stoppedGenerating, stopGenerating] = useAtom(stopGeneratingAtom)
  const [requestId] = useAtom(requestIdAtom)

  const isResponding = checkResponding(appId)
  const update = (func: IUpdateResponse) => {
    if (requestId) updateResponse(requestId, appId, func)
  }

  const onFinal = () => {
    console.log("-- DONE")
    // 这个不重要
    update((s) => {
      s.tEnd = new Date()
    })
  }

  const refSSE = useRef<EventSource>()

  useEffect(() => {
    if (!isResponding || !requestId) return

    refSSE.current = fetchSSE(`/api/llm?r=${getTriggerID(requestId, appId)}`, {
      onOpen: () => {
        console.log("-- STARTED")
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
        console.warn({ error })
        update((s) => {
          s.error = error
        })
      },
      onFinal,
    })
  }, [isResponding])

  useEffect(() => {
    const sse = refSSE.current
    // console.log({ sse, stoppedGenerating })

    if (stoppedGenerating && sse && sse.readyState !== sse.CLOSED) {
      sse.close()
      onFinal()
    }

    // 复原
    stopGenerating(false)
  }, [stoppedGenerating])
}
