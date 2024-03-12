import { useAtom } from "jotai"
import { initPusherClient } from "../client/init"
import { pusherServerConfigs } from "../config"
import {
  pusherClientAtom,
  pusherLastPingTimeAtom,
  pusherLastPongTimeAtom,
  pusherLatenciesAtom,
  pusherLatencyAtom,
  pusherServerIdAtom,
} from "../store"
import { useEffect, useRef } from "react"
import { sum } from "lodash"
import PusherJS from "pusher-js"

export const usePusherClient = () => {
  const [serverId] = useAtom(pusherServerIdAtom)
  const [, setPusherClient] = useAtom(pusherClientAtom)
  const [pusherLastPingTime, setPusherLastPingTime] = useAtom(
    pusherLastPingTimeAtom,
  )
  const [pusherLastPongTime, setPusherLastPongTime] = useAtom(
    pusherLastPongTimeAtom,
  )
  const [latencies] = useAtom(pusherLatenciesAtom)
  const [, setPusherLatency] = useAtom(pusherLatencyAtom)

  const refPusherClient = useRef<PusherJS>()

  useEffect(() => {
    refPusherClient.current = initPusherClient(pusherServerConfigs[serverId], {
      onInit: (pusherClient) => {
        setPusherClient(pusherClient)
      },
      onPing: () => {
        setPusherLastPingTime(Date.now())
      },
      onPong: () => {
        setPusherLastPongTime(Date.now())

        const newLatency = pusherLastPongTime! - pusherLastPingTime!
        latencies.push(newLatency)

        const latency = sum(latencies) / latencies.length
        setPusherLatency(latency)
      },
    })
  }, [])

  return refPusherClient.current
}
