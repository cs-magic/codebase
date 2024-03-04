import { atom } from "jotai"
import { IMessageInChat } from "@/schema/message"

import { persistedCurAppIdAtom } from "@/store/app"
import { convDetailAtom } from "@/store/conv"
import { atomWithStorage } from "jotai/utils"

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
  get(convDetailAtom)?.requests?.find(
    (r) => r.id === get(requestIdPersistedAtom),
  ),
)

export const baseContextAtom = atom((get) => get(requestAtom)?.context ?? [])
export const getAppContextAtom = atom((get) => (appID: string) => {
  const request = get(requestAtom)

  // 1. 先获取最近一次请求里的上下文
  const context = [...(request?.context ?? [])] as IMessageInChat[]
  // console.log({ context })

  // 2. 再拼接回复里的内容
  const content = request?.responses.find((r) => r.appId === appID)?.response
  // console.log({ content })
  if (content)
    context.push({
      role: "assistant",
      content,
      updatedAt: new Date(),
      isError: false,
    })
  // console.log({ contextFinal: context })
  return context
})
export const currentContextAtom = atom((get) => {
  const currentAppId = get(persistedCurAppIdAtom)
  if (typeof currentAppId !== "string")
    throw new Error("selected app id should be string type")

  const getContext = get(getAppContextAtom)
  const currentContext = getContext(currentAppId)
  console.log({ currentAppId, currentContext })
  // console.log("-- ✅ currentContextAtom: ", {
  //   selectedAppId,
  //   context,
  //   typeOfAppId: typeof selectedAppId,
  // })
  return currentContext
})
