import { Prisma } from "@prisma/client"
import ansiColors from "ansi-colors"
import { useEffect } from "react"
import { initPusherClient } from "../../packages/common-puser/client/init"
import { pusherServerConfigs } from "../../packages/common-puser/config"
import { SseEventType } from "../../packages/common-sse/schema"
import { getTriggerIdFromSseRequest, ILLMRequest } from "../schema/sse"
import { updateAppResponseAtom } from "../store/conv"
import { transportTypeAtom } from "../store/query"
import { useAtom } from "jotai"

export const useQueryLlmPusher = (sseRequest: ILLMRequest) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [, updateAppResponse] = useAtom(updateAppResponseAtom)

  const triggerId = getTriggerIdFromSseRequest(sseRequest)

  const update = (
    func: (data: Prisma.ResponseUncheckedCreateInput) => void,
  ) => {
    if (sseRequest.type !== "app-response" || !sseRequest.requestId) return

    updateAppResponse(sseRequest.requestId, sseRequest.appId, func)
  }

  useEffect(() => {
    if (transportType !== "pusher") return

    const pusher = initPusherClient(
      pusherServerConfigs[sseRequest.pusherServerId],
    )
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
}
