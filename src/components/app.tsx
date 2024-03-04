import { cn } from "../../packages/common/lib/utils"
import { useEffect, useState } from "react"
import { fetchSSE } from "../../packages/common/lib/sse"
import { IAppInChat } from "@/schema/app"
import { useAtom } from "jotai"
import { convDetailAtom } from "@/store/conv.atom"
import { TopBar } from "@/components/app-top-bar"
import { MessagesComp } from "@/components/app-messages"
import {
  appFinishedSSEAtom,
  appsShouldSSEAtom,
  getTriggerID,
  requestIDAtom,
} from "@/store/request.atom"
import { last } from "lodash"

export const AppComp = ({ app }: { app: IAppInChat }) => {
  const { id } = app

  const [fetching, setFetching] = useState(false)

  const [conv, setConv] = useAtom(convDetailAtom)
  const [appsShouldSSE] = useAtom(appsShouldSSEAtom)
  const [, appFinishedSSE] = useAtom(appFinishedSSEAtom)
  const [requestID] = useAtom(requestIDAtom)
  const triggerID = getTriggerID(conv?.id ?? "", requestID, app.id)
  const shouldSSE = appsShouldSSE.includes(triggerID)

  useEffect(() => {
    if (!shouldSSE) return
    void fetchSSE(`/api/llm?r=${triggerID}`, {
      onOpen: () => {
        setFetching(true)
        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.app.id === app.id,
          )
          if (!s) return
          s.tStart = new Date()
          s.response = ""
        })
      },
      onData: (data) => {
        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.app.id === app.id,
          )
          if (!s) return
          s.response += data
        })
      },
      onError: (data) => {
        console.error("-- fetched error: ", data)
        setConv((conv) => {
          const s = last(conv?.requests)?.responses.find(
            (r) => r.app.id === app.id,
          )
          if (!s) return
          s.error = data
        })
      },
      onFinal: () => {
        // s.tEnd = new Date()
        // todo: 在服务端维护
        appFinishedSSE(app.id)
        setFetching(false)
      },
    })
  }, [shouldSSE])

  return (
    <div
      className={cn(
        "w-full h-full overflow-hidden flex flex-col relative border-t border-r",
      )}
    >
      <TopBar appID={id} title={app?.model.title} fetching={fetching} />

      <MessagesComp appId={id} logo={app?.model.logo} />
    </div>
  )
}
