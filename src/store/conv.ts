import { IConvDetail, IConvSummary } from "@/schema/conv"
import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { IMessageInChat } from "../schema/message"
import { appIdPersistedAtom } from "./app"

//////////////////////////////
// base
//////////////////////////////

export const convsAtom = atom<IConvSummary[]>([])
export const convDetailAtom = atomWithImmer<IConvDetail | null>(null)
export const convIdAtom = atom((get) => get(convDetailAtom)?.id)

// todo: from server
export const requestIdPersistedAtom = atomWithStorage("conv.request.id", "")

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
