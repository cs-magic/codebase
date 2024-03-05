"use client"

import { MessagesComp } from "@/components/app-messages"
import { TopBar } from "@/components/app-top-bar"
import { getTriggerID } from "@/lib/utils"
import { IAppInChat } from "@/schema/app"
import { appFinishedSSEAtom } from "@/store/app"
import { convDetailAtom } from "@/store/conv"
import {
  appsShouldSSEPersistedAtom,
  contextsAtom,
  requestIdPersistedAtom,
} from "@/store/request"
import { useAtom } from "jotai"
import { last } from "lodash"
import { useEffect, useState } from "react"
import { fetchSSE } from "../../packages/common/lib/sse/fetch-sse"
import { cn } from "../../packages/common/lib/utils"

export const AppComp = ({ app }: { app: IAppInChat }) => {
  const [conv, setConv] = useAtom(convDetailAtom)
  const [appsShouldSSE] = useAtom(appsShouldSSEPersistedAtom)
  const [, appFinishedSSE] = useAtom(appFinishedSSEAtom)
  const [requestID] = useAtom(requestIdPersistedAtom)
  const [contexts] = useAtom(contextsAtom)

  const { id } = app
  const [fetching, setFetching] = useState(false)
  const triggerID = getTriggerID(requestID, app.id)
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

      <MessagesComp
        appId={id}
        logo={app?.model.logo}
        context={contexts[app.id] ?? []}
      />
    </div>
  )
}
