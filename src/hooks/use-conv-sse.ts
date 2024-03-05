import { useAtom } from "jotai"
import { useEffect } from "react"
import { fetchSSE } from "../../packages/common/lib/sse/fetch-sse"
import { getTriggerID } from "../lib/utils"
import { IUpdateResponse } from "../schema/conv"
import {
  checkRespondingAtom,
  requestIdAtom,
  updateResponseAtom,
} from "../store/conv"

export const useConvSSE = (appId: string) => {
  const [checkResponding] = useAtom(checkRespondingAtom)
  const [requestId] = useAtom(requestIdAtom)
  const [, updateResponse] = useAtom(updateResponseAtom)

  const isResponding = checkResponding(appId)
  const update = (func: IUpdateResponse) =>
    updateResponse(requestId, appId, func)

  useEffect(() => {
    if (!isResponding || !requestId) return

    void fetchSSE(`/api/llm?r=${getTriggerID(requestId, appId)}`, {
      onOpen: () => {
        console.log("-- STARTED")
        update((s) => {
          s.tStart = new Date()
          s.response = ""
        })
      },
      onData: (data) => {
        // console.debug({ data })
        update((s) => {
          s.response += data
        })
      },
      onError: (error) => {
        console.warn({ error })
        update((s) => {
          s.error = error
        })
      },
      onFinal: () => {
        console.log("-- DONE")
        // 这个不重要
        update((s) => {
          s.tEnd = new Date()
        })
      },
    })
  }, [isResponding])
}
