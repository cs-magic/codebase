import { useAtom } from "jotai"
import { useEffect } from "react"
import { LogLevel } from "../../packages/common-log/schema"
import { pusherLogLevelAtom } from "../../packages/common-pusher/store"
import { ISSEEvent, SSEEventType } from "../../packages/common-sse/schema"
import { transportTypeAtom } from "../../packages/common-transport/store"
import { IBaseResponse } from "../schema/query"
import { getTriggerIdFromSSERequest, ILLMRequest } from "../schema/sse"
import { usePusher } from "./use-pusher"
import ansiColors from "ansi-colors"

/**
 *
 * @param request
 * @param update
 * @param autoClose 是否取消频道监听
 */
export const useLlmPusher = (
  request: ILLMRequest,
  options: {
    update: (func: (response: IBaseResponse) => void) => void
    onInit?: () => void
    autoClose?: boolean
  },
) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [pusherLogLevel] = useAtom(pusherLogLevelAtom)

  const { pusher } = usePusher()
  const triggerId = getTriggerIdFromSSERequest(request)

  const { update, onInit, autoClose } = options

  useEffect(() => {
    if (transportType !== "pusher" || !triggerId || !pusher) return

    const channel = pusher.subscribe(triggerId)

    if (pusherLogLevel <= LogLevel.info)
      console.log(
        ansiColors.red(`[pusher] bound to channel: ${triggerId} `),
        request,
      )

    const bindEvent = <T extends SSEEventType>(
      type: T,
      func: (event: ISSEEvent<T>["data"]) => void,
    ) => {
      channel.bind(type, (data: ISSEEvent<T>["data"]) => {
        if (pusherLogLevel <= LogLevel.debug)
          console.log(`[pusher] ${triggerId} << ${type}`, data)
        func(data)
      })
    }

    bindEvent("data", (data) => {
      update((response) => {
        if (!response.content) response.content = data.token
        else response.content += data.token
        // console.log("-- updating pusher token: ", {
        //   token: data.token,
        //   content: response.content,
        // })
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

    return () => {
      if (autoClose) {
        console.log(ansiColors.red(`[pusher] unbound ${triggerId}`))
        pusher.unsubscribe(triggerId)
      }
    }
  }, [triggerId, pusher, transportType, pusherLogLevel])
}
