import { PusherConnectionState } from "./schema"
import { initPusherClient } from "./client/init"
import { pusherServerConfigs, PusherServerId } from "./config"
import PusherJS from "pusher-js"
import { toast } from "sonner"
import sum from "lodash/sum"

import { FixedArray } from "../../schema/algo"
import { atom } from "jotai"

export const socketServerIdAtom = atom<PusherServerId>("tencent_wss")
export const socketClientAtom = atom<PusherJS | null>(null)
export const socketStateAtom = atom<PusherConnectionState>("initialized")
export const socketLastPingTimeAtom = atom<number | null>(null)
export const socketLastPongTimeAtom = atom<number | null>(null)
export const socketLatencyAtom = atom<number>(0)
export const socketLatenciesAtom = atom<FixedArray<number>>(
  new FixedArray<number>(10),
)

export const cleanSocketAtom = atom(null, (get, set) => {
  const client = get(socketClientAtom)
  client?.disconnect()
  set(socketClientAtom, null)
})

export const socketLogAtom = atom((get) => ({
  lastPingTime: get(socketLastPingTimeAtom),
  lastPongTime: get(socketLastPongTimeAtom),
  latency: get(socketLatencyAtom),
  latencies: get(socketLatenciesAtom),
}))

export const initSocketAtom = atom(null, (get, set) => {
  const serverId = get(socketServerIdAtom)
  initPusherClient(pusherServerConfigs[serverId], {
    onInit: (pusherClient) => {
      set(socketClientAtom, pusherClient)
    },
    onPing: () => {
      set(socketLastPingTimeAtom, Date.now())
    },
    onPong: () => {
      set(socketLastPongTimeAtom, Date.now())

      const newLatency =
        get(socketLastPongTimeAtom)! - get(socketLastPingTimeAtom)!
      const latencies = get(socketLatenciesAtom)
      latencies.push(newLatency)

      const latency = sum(latencies) / latencies.length
      set(socketLatencyAtom, latency)

      console.log("pong: ", get(socketLogAtom))
      toast.info("pong!")
    },
  })
})
