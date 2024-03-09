import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { LogLevel } from "../../packages/common-log/schema"
import { pusherLogLevelAtom } from "../../packages/common-puser/store"
import { ISseEvent, SseEventType } from "../../packages/common-sse/schema"
import { IBaseResponse } from "../schema/query"
import { getTriggerIdFromSseRequest, ILLMRequest } from "../schema/sse"
import { transportTypeAtom } from "../store/query"
import { usePusher } from "./use-pusher"

/**
 *
 * @param request
 * @param update
 * @param autoClose 是否取消频道监听
 */
export const useLlmPusher = (
  request: ILLMRequest,
  update: (func: (response: IBaseResponse) => void) => void,
  autoClose: boolean,
) => {
  const [transportType] = useAtom(transportTypeAtom)
  const [pusherLogLevel] = useAtom(pusherLogLevelAtom)

  const { pusher } = usePusher()
  const triggerId = getTriggerIdFromSseRequest(request)

  useEffect(() => {
    if (transportType !== "pusher" || !triggerId || !pusher) return

    const channel = pusher.subscribe(triggerId)

    if (pusherLogLevel <= LogLevel.info)
      console.log(`[pusher] bound to channel: ${triggerId}, `, request)

    const bindEvent = <T extends SseEventType>(
      type: T,
      func: (event: ISseEvent<T>["data"]) => void,
    ) => {
      // console.log(`[pusher] binding event: `, type)
      channel.bind(type, (event: ISseEvent<T>) => {
        if (pusherLogLevel <= LogLevel.debug)
          console.log(
            `[pusher] << ${ansiColors.bgBlue.white(event.event)}`,
            event.data,
          )
        func(event)
      })
    }

    bindEvent("data", (event) => {
      update((response) => {
        if (!response.content) response.content = event.token
        else response.content += event.token
      })
    })

    bindEvent("error", (event) => {
      update((response) => {
        response.error = event.message
      })
    })

    bindEvent("init", (event) => {
      update((response) => {
        response.tStart = new Date()
      })
    })

    bindEvent("close", (event) => {
      update((response) => {
        response.tEnd = new Date()
      })
    })

    return () => {
      if (autoClose) pusher.unsubscribe(triggerId)
    }
  }, [triggerId, pusher, transportType, pusherLogLevel])
}
