"use client"

import { useConvSse } from "@/hooks/use-conv-sse"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-puser/client/init"
import { pusherServerConfigs } from "../../packages/common-puser/config"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { ISseEvent, SseEventType } from "../../packages/common-sse/schema"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IAppDetail } from "../schema/app.detail"
import { IContext, RoleType } from "../schema/message"
import { getTriggerIdFromSseRequest, ISseRequest } from "../schema/sse"
import { appIdPersistedAtom, appsPersistedAtom } from "../store/app"
import {
  checkRespondingStatus,
  requestAtom,
  requestIdAtom,
  responsesAtom,
  updateAppResponseAtom,
  updateConvTitleAtom,
} from "../store/conv"
import { transportTypeAtom } from "../store/query"
import { ConvAppMessages } from "./conv-app-messages"
import { ConvAppTopBar } from "./conv-app-top-bar"

export const ConvApp = ({
  app,
  commonContext,
}: {
  app: IAppDetail
  commonContext: IContext
}) => {
  const [persistedApps] = useAtom(appsPersistedAtom)
  const [selectedAppId] = useAtom(appIdPersistedAtom)
  // const [request] = useAtom(requestAtom)
  const [requestId] = useAtom(requestIdAtom)
  const [responses] = useAtom(responsesAtom)
  const [pusherServerId] = useAtom(pusherServerIdAtom)
  const [transportType] = useAtom(transportTypeAtom)

  const targetAppId = persistedApps.some((a) => a.id === app.id)
    ? app.id
    : selectedAppId
  const response = responses.find((r) => r.appId === targetAppId)
  const context = !response
    ? commonContext
    : [
        ...commonContext,
        {
          content: response.error ?? response.content ?? "",
          role: "assistant" as RoleType,
          updatedAt: response.updatedAt,
          isError: !!response.error,
        },
      ]

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
    if (requestId) updateAppResponse(requestId, app.id, func)
  }
  const sseRequest: ISseRequest = {
    type: "app-response",
    status: checkRespondingStatus(response),
    requestId,
    appId: app.id,
    pusherServerId,
  }
  const triggerId = getTriggerIdFromSseRequest(sseRequest)

  useEffect(() => {
    if (transportType !== "pusher") return

    const pusher = initPusherClient(pusherServerConfigs[pusherServerId])
    const channel = pusher.subscribe(triggerId)
    console.log(ansiColors.red(`pusher bounds to channel: ${triggerId}`), {
      triggerId,
    })
    channel.bind("data" as SseEventType, (data: string) => {
      console.log("data: ", data)
      update((response) => {
        if (!response.content) response.content = data
        else response.content += data
      })
    })
    channel.bind("error" as SseEventType, (data: string) => {
      console.log("error: ", data)
      update((response) => {
        response.error = data
      })
    })
    return () => {
      pusher.unsubscribe(triggerId)
    }
  }, [triggerId])

  useConvSse(sseRequest)

  // console.log({ appId: config.id, commonContext, response })

  return (
    <div
      className={cn(
        "w-full h-full overflow-auto flex flex-col relative border-t border-r",
      )}
    >
      <ConvAppTopBar app={app} />

      <ConvAppMessages
        appId={app.id}
        logo={app?.model.logo}
        context={context}
      />
    </div>
  )
}
