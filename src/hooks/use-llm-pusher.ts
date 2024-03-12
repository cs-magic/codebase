import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { LogLevel } from "../../packages/common-log/schema"
import { usePusherClient } from "../../packages/common-pusher/hooks/use-pusher-client"
import { IEnsureResponse } from "../../packages/common-pusher/schema"
import { pusherLogLevelAtom } from "../../packages/common-pusher/store"
import { ITransEvent, TransEventType } from "../../packages/common-sse/schema"
import { transportTypeAtom } from "../../packages/common-transport/store"
import { IBaseResponse } from "../schema/query"
import { getChannelIdFomRequest, ILLMPusherListener } from "../schema/sse"

/**

 */
export const useLLMPusher = (
  listener: ILLMPusherListener | null,
  options: {
    ensureResponse: IEnsureResponse
    onInit?: () => void
  } | null,
) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [pusherLogLevel] = useAtom(pusherLogLevelAtom)

  const pusherClient = usePusherClient()

  useEffect(() => {
    // console.log("useLLMPusher: ", {request, transportType, pusherClient, options})

    if (!listener || transportType !== "pusher" || !pusherClient || !options)
      return

    const channelId = getChannelIdFomRequest(listener)

    if (!channelId) return

    const channel = pusherClient.subscribe(channelId)

    if (pusherLogLevel <= LogLevel.info)
      console.log(
        ansiColors.red(`[pusher] bound to channel: ${channelId} `),
        listener,
      )

    const { onInit, ensureResponse } = options

    const bindEvent = <T extends TransEventType>(
      type: T,
      func: (data: ITransEvent<T>["data"], response: IBaseResponse) => void,
    ) => {
      channel.bind(type, (data: ITransEvent<T>["data"]) => {
        if (pusherLogLevel <= LogLevel.debug)
          console.log(`[pusher] ${channelId} << ${type}`, data)

        const response = ensureResponse(data)

        if (!response) return

        func(data, response)
      })
    }

    bindEvent("data", (data, response) => {
      if (!response.content) response.content = data.token
      else response.content += data.token
    })

    bindEvent("error", (data, response) => {
      response.error = data.message
    })

    bindEvent("init", (data, response) => {
      if (onInit) onInit()
      response.tStart = new Date()
    })

    bindEvent("close", (data, response) => {
      response.tEnd = new Date()
    })

    /**
     * 要清理，否则会有重复监听的问题
     */
    return () => {
      console.log(ansiColors.red(`[pusher] unbound ${channelId}`))
      pusherClient.unsubscribe(channelId)
    }
  }, [listener, options, pusherClient, transportType, pusherLogLevel])
}
