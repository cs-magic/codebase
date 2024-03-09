import ansiColors from "ansi-colors"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { ISseEvent, SseEventType } from "../../packages/common-sse/schema"
import { IBaseResponse } from "../schema/query"
import { getTriggerIdFromSseRequest, ILLMRequest } from "../schema/sse"
import { transportTypeAtom } from "../store/query"
import { usePusher } from "./use-pusher"

export const useLlmPusher = (
  request: ILLMRequest,
  update: (func: (response: IBaseResponse) => void) => void,
) => {
  const [transportType] = useAtom(transportTypeAtom)

  const { pusher } = usePusher()
  const triggerId = getTriggerIdFromSseRequest(request)

  useEffect(() => {
    if (transportType !== "pusher" || !triggerId || !pusher) return

    const channel = pusher.subscribe(triggerId)
    console.log(
      ansiColors.red(
        `[pusher] bound to channel: ${triggerId}, type: ${request.type}, status: ${request.status}`,
      ),
      {
        triggerId,
      },
    )

    const bindEvent = <T extends SseEventType>(
      type: T,
      func: (event: ISseEvent<T>) => void,
    ) => {
      // console.log(`[pusher] binding event: `, type)
      channel.bind(type, (event: ISseEvent<T>) => {
        console.log(`[pusher-client] << `, event)
        func(event)
      })
    }

    bindEvent("data", (event) => {
      console.log({ event })
      update((response) => {
        if (!response.content) response.content = event.data.token
        else response.content += event.data.token
      })
    })

    bindEvent("error", (event) => {
      console.log({ event })
      update((response) => {
        response.error = event.data.message
      })
    })

    bindEvent("init", (event) => {
      console.log({ event })
      update((response) => {
        response.tStart = new Date()
      })
    })

    bindEvent("close", (event) => {
      console.log({ event })
      update((response) => {
        response.tEnd = new Date()
      })
    })

    return () => {
      pusher.unsubscribe(triggerId)
    }
  }, [triggerId, pusher, transportType])
}
