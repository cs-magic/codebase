import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { LogLevel } from "../../packages/common-log/schema"
import {
  pusherClientAtom,
  pusherLogLevelAtom,
} from "../../packages/common-pusher/store"
import { ITransEvent, TransEventType } from "../../packages/common-sse/schema"
import { transportTypeAtom } from "../../packages/common-transport/store"
import { IBaseResponse } from "../schema/query"
import { getChannelIdFomRequest, ILLMRequest } from "../schema/sse"

/**

 */
export const useLLMPusher = (
  request?: ILLMRequest | null,
  options?: {
    update: (func: (response: IBaseResponse) => void) => void
    onInit?: () => void
  },
) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [pusher] = useAtom(pusherClientAtom)
  const [pusherLogLevel] = useAtom(pusherLogLevelAtom)

  useEffect(() => {
    console.log("useLLMPuser: ", { request, transportType, pusher, options })

    if (!request || transportType !== "pusher" || !pusher || !options) return

    const channelId = getChannelIdFomRequest(request)

    if (!channelId) return

    const channel = pusher.subscribe(channelId)

    if (pusherLogLevel <= LogLevel.info)
      console.log(
        ansiColors.red(`[pusher] bound to channel: ${channelId} `),
        request,
      )

    const { update, onInit } = options

    const bindEvent = <T extends TransEventType>(
      type: T,
      func: (event: ITransEvent<T>["data"]) => void,
    ) => {
      channel.bind(type, (data: ITransEvent<T>["data"]) => {
        if (pusherLogLevel <= LogLevel.debug)
          console.log(`[pusher] ${channelId} << ${type}`, data)
        func(data)
      })
    }

    bindEvent("data", (data) => {
      options.update((response) => {
        if (!response.content) response.content = data.token
        else response.content += data.token
      })
    })

    bindEvent("error", (data) => {
      update((response) => {
        response.error = data.message
      })
    })

    bindEvent("init", (data) => {
      if (onInit) onInit()
      update((response) => {
        response.tStart = new Date()
      })
    })

    bindEvent("close", (data) => {
      update((response) => {
        response.tEnd = new Date()
      })
    })

    /**
     * 要清理，否则会有重复监听的问题
     */
    return () => {
      console.log(ansiColors.red(`[pusher] unbound ${channelId}`))
      pusher.unsubscribe(channelId)
    }
  }, [request, options, pusher, transportType, pusherLogLevel])
}
