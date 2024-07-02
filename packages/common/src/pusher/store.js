import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { LogLevel } from "@cs-magic/log/src/schema"
import { FixedArray } from "@cs-magic/common/schema/fixed-array"
//////////////////////////////
// base
//////////////////////////////
export const pusherServerAtom = atom(null)
export const pusherClientAtom = atom(null)
export const pusherServerIdAtom = atomWithStorage(
  "pusher.server.id",
  "tencent_wss",
)
export const pusherStateAtom = atom("initialized")
export const pusherLastPingTimeAtom = atom(null)
export const pusherLastPongTimeAtom = atom(null)
export const pusherLatencyAtom = atom(0)
export const pusherLatenciesAtom = atom(new FixedArray(10))
export const pusherLogLevelAtom = atomWithStorage(
  "pusher.log.level",
  LogLevel.debug,
)
//////////////////////////////
// derived
//////////////////////////////
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
