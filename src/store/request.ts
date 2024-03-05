import { atom } from "jotai"
import { convDetailAtom } from "@/store/conv"
import { atomWithStorage } from "jotai/utils"
import { IMessageInChat } from "../schema/message"
import { appIdPersistedAtom } from "./app" //////////////////////////////

//////////////////////////////
// base
//////////////////////////////

// todo: from server
export const requestIdPersistedAtom = atomWithStorage("conv.requestID", "")
/**
 * 持久化监听，直到服务端已经发完为止
 * todo: from server
 */
export const appsShouldSSEPersistedAtom = atomWithStorage<string[]>(
  "conv.apps.shouldSSE",
  [],
)

//////////////////////////////
// derived
//////////////////////////////

export const requestAtom = atom((get) =>
  get(convDetailAtom)?.requests.find(
    (r) => r.id === get(requestIdPersistedAtom),
  ),
)

export const contextsAtom = atom((get) => {
  const contextMap: Record<string, IMessageInChat[]> = {}
  const request = get(requestAtom)
  request?.responses.forEach((r) => {
    contextMap[r.appId] = [
      ...request.context,
      { content: r.response /*possible null*/ ?? "", role: "assistant" },
    ]
  })
  return contextMap
})

export const contextAtom = atom(
  (get) => get(contextsAtom)[get(appIdPersistedAtom)] ?? [],
)
