import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { last } from "lodash"
import { useEffect } from "react"
import { fetchSSE } from "../../packages/common/lib/sse/fetch-sse"
import { getTriggerID } from "../lib/utils"
import { appIsFetchingAtom } from "../store/app"
import { convDetailAtom, requestIdPersistedAtom } from "../store/conv"

export const useConvSSE = (appId: string) => {
  const [, setConv] = useAtom(convDetailAtom)

  // todo: 这个requestId在发送conv-query之后没有更新
  const [requestId] = useAtom(requestIdPersistedAtom)

  const [isFetching, setFetching] = useAtom(appIsFetchingAtom)

  console.log(ansiColors.blue("[useConvSSE] outer "), {
    requestId,
    appId,
    isFetching,
  })

  useEffect(() => {
    if (!requestId) return

    console.log(ansiColors.red("[useConvSSE] inner "), {
      requestId,
      appId,
      isFetching,
    })

    void fetchSSE(`/api/llm?r=${getTriggerID(requestId, appId)}`, {
      onOpen: () => {
        setFetching(true)

        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.appId === appId,
          )
          if (!s) return
          s.tStart = new Date()
          s.response = ""
        })
      },
      onData: (data) => {
        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.appId === appId,
          )
          if (!s) return
          s.response += data
        })
      },
      onError: (data) => {
        console.error("-- sse error: ", data)
        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.appId === appId,
          )
          if (!s) return
          s.error = data
        })
      },
      onFinal: () => {
        // todo: 在服务端维护
        // s.tEnd = new Date()
        console.log(`-- finished fetching ${getTriggerID(requestId, appId)}`)
        setFetching(false)
      },
    })
  }, [
    // 目前只需要 request 变，就重新触发所有app的拉取申请
    // todo: 之后可以做的更智能一些
    requestId,
  ])
}
