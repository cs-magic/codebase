import { FixedArray } from "../common-algo/array"
import { PusherConnectionState } from "./schema"
import { initPusherClient } from "./client/init"
import { pusherServerConfigs, PusherServerId } from "./config"
import PusherJS from "pusher-js"
import { toast } from "sonner"
import sum from "lodash/sum"

import { atom } from "jotai"

export const pusherServerIdAtom = atom<PusherServerId>("tencent_wss")
export const pusherClientAtom = atom<PusherJS | null>(null)
export const pusherStateAtom = atom<PusherConnectionState>("initialized")
export const pusherLastPingTimeAtom = atom<number | null>(null)
export const pusherLastPongTimeAtom = atom<number | null>(null)
export const pusherLatencyAtom = atom<number>(0)
export const pusherLatenciesAtom = atom<FixedArray<number>>(
  new FixedArray<number>(10),
)

export const cleanPusherAtom = atom(null, (get, set) => {
  const client = get(pusherClientAtom)
  client?.disconnect()
  set(pusherClientAtom, null)
})

export const pusherLogAtom = atom((get) => ({
  lastPingTime: get(pusherLastPingTimeAtom),
  lastPongTime: get(pusherLastPongTimeAtom),
  latency: get(pusherLatencyAtom),
  latencies: get(pusherLatenciesAtom),
}))

export const initPusherAtom = atom(null, (get, set) => {
  const serverId = get(pusherServerIdAtom)
  initPusherClient(pusherServerConfigs[serverId], {
    onInit: (pusherClient) => {
      set(pusherClientAtom, pusherClient)
    },
    onPing: () => {
      set(pusherLastPingTimeAtom, Date.now())
    },
    onPong: () => {
      set(pusherLastPongTimeAtom, Date.now())

      const newLatency =
        get(pusherLastPongTimeAtom)! - get(pusherLastPingTimeAtom)!
      const latencies = get(pusherLatenciesAtom)
      latencies.push(newLatency)

      const latency = sum(latencies) / latencies.length
      set(pusherLatencyAtom, latency)

      console.log("pong: ", get(pusherLogAtom))
      toast.info("pong!")
    },
  })
})
