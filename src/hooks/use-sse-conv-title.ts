import { useAtom } from "jotai"
import { fetchSSE } from "../../packages/common-sse/fetch-sse"
import { convIdAtom, requestIdAtom, serverConvDetailAtom } from "../store/conv"
import { getTriggerID } from "../utils"
import { useEffect, useRef } from "react"
import { ConvTitleResponse } from "@prisma/client"
import { produce } from "immer"

export const useConvTitleSse = () => {
  const [convId] = useAtom(convIdAtom)
  const [requestId] = useAtom(requestIdAtom)
  const [, setConv] = useAtom(serverConvDetailAtom)

  const refSSE = useRef<EventSource>()
  const update = (func: (response: ConvTitleResponse) => void) => {
    setConv((conv) =>
      produce(conv, (conv) => {
        if (conv?.titleResponse) func(conv.titleResponse)
      }),
    )
  }

  useEffect(() => {
    if (!convId || !requestId) return

    refSSE.current = fetchSSE(`/api/llm?r=${getTriggerID(requestId, convId)}`, {
      onOpen: () => {
        console.log("-- STARTED")
        update((response) => (response.content = ""))
      },
      onData: (data) => {
        console.debug({ data })
        update((response) => (response.content += data))
      },
      onError: (error) => {
        console.warn({ error })
        update((response) => (response.error = error))
      },
      onFinal: () => {
        update((response) => (response.tEnd = new Date()))
      },
    })
  }, [requestId])

  useEffect(() => {
    const sse = refSSE.current
    // console.log({ sse, stoppedGenerating })

    if (sse && sse.readyState !== sse.CLOSED) {
      sse.close()
    }
  }, [])
}
