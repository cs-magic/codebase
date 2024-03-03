import { atomWithStorage } from "jotai/utils"
import { atom } from "jotai"
import { convDetailAtom, convIdAtom } from "@/store/conv.atom"
import { IMessageInChat } from "@/schema/message"

export const requestIDAtom = atomWithStorage("conv.requestID", "")
/**
 * 持久化监听，直到服务端已经发完为止
 */
export const appsShouldSSEAtom = atomWithStorage<string[]>(
  "conv.apps.shouldSSE",
  [],
)
export const appFinishedSSEAtom = atom(null, (get, set, appID: string) => {
  set(appsShouldSSEAtom, (draft) =>
    draft.filter(
      (d) =>
        d !== getTriggerID(get(convIdAtom) ?? "", get(requestIDAtom), appID),
    ),
  )
})

export const requestAtom = atom((get) =>
  get(convDetailAtom)?.requests.find((r) => r.id === get(requestIDAtom)),
)

export const contextAtom = atom((get) => get(requestAtom)?.context ?? [])
export const getAppContextAtom = atom((get) => (appID: string) => {
  const request = get(requestAtom)
  console.log({ request, requestID: get(requestIDAtom) })
  const context = [...(request?.context ?? [])] as IMessageInChat[]
  const content = request?.responses.find((r) => r.appId === appID)?.response
  if (content)
    context.push({
      role: "assistant",
      content,
      updatedAt: new Date(),
      isError: false,
    })
  return context
})

export const getTriggerID = (
  convID: string,
  requestID: string,
  appID: string,
) => [convID, requestID, appID].join("-")
