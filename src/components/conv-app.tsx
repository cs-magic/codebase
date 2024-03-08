"use client"

import { useConvSse } from "@/hooks/use-conv-sse"
import { Prisma } from "@prisma/client"
import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-puser/client/init"
import { pusherServerConfigs } from "../../packages/common-puser/config"
import { pusherServerIdAtom } from "../../packages/common-puser/store"
import { SseEventType } from "../../packages/common-sse/schema"
import { cn } from "../../packages/common-ui/shadcn/utils"
import { IAppDetail } from "../schema/app.detail"
import { IContext, RoleType } from "../schema/message"
import { getTriggerIdFromSseRequest, ISseRequest } from "../schema/sse"
import { appIdPersistedAtom, appsPersistedAtom } from "../store/app"
import {
  checkRespondingStatus,
  requestIdAtom,
  responsesAtom,
  updateAppResponseAtom,
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
  const update = (
    func: (data: Prisma.ResponseUncheckedCreateInput) => void,
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
    channel.bind("init" as SseEventType, (data: { time: number }) => {
      console.log(`[${Date.now()}] [pusher] init: `, data)
      update((response) => {
        response.tStart = new Date()
      })
    })
    channel.bind("data" as SseEventType, (data: string) => {
      console.log(`[${Date.now()}] [pusher] data: `, data)
      update((response) => {
        if (!response.content) response.content = data
        else response.content += data
      })
    })
    channel.bind("error" as SseEventType, (data: string) => {
      console.log(`[${Date.now()}] [pusher] error: `, data)
      update((response) => {
        response.error = data
      })
    })
    channel.bind("close" as SseEventType, (data: string) => {
      console.log(`[${Date.now()}] [pusher] close: `, data)
      update((response) => {
        response.tEnd = new Date()
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
