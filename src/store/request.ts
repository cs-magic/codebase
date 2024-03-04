import { atom } from "jotai"
import { IMessageInChat } from "@/schema/message"

import { persistedSelectedAppIDAtom } from "@/store/app.persisted"
import { appsShouldSSEAtom, requestIDAtom } from "@/store/request.persisted"
import { convDetailAtom } from "@/store/conv.immer"

export const appFinishedSSEAtom = atom(null, (get, set, appID: string) => {
  set(appsShouldSSEAtom, (draft) =>
    draft.filter((d) => d !== getTriggerID(get(requestIDAtom), appID)),
  )
})

export const requestAtom = atom((get) =>
  get(convDetailAtom)?.requests?.find((r) => r.id === get(requestIDAtom)),
)

export const baseContextAtom = atom((get) => get(requestAtom)?.context ?? [])
export const getAppContextAtom = atom((get) => (appID: string) => {
  const request = get(requestAtom)

  // 1. 先获取最近一次请求里的上下文
  const context = [...(request?.context ?? [])] as IMessageInChat[]
  console.log({ context })

  // 2. 再拼接回复里的内容
  const content = request?.responses.find((r) => r.appId === appID)?.response
  console.log({ content })
  if (content)
    context.push({
      role: "assistant",
      content,
      updatedAt: new Date(),
      isError: false,
    })
  console.log({ contextFinal: context })
  return context
})
export const currentContextAtom = atom((get) =>
  get(getAppContextAtom)(get(persistedSelectedAppIDAtom)),
)

/**
 * triggerID 合并没问题，但是谨慎分隔，因为字符串可能由prisma控制的
 * @param requestID
 * @param appID
 */
export const TRIGGER_SEPARATOR = "__"
export const getTriggerID = (requestID: string, appID: string) =>
  [requestID, appID].join(TRIGGER_SEPARATOR)

currentContextAtom.debugLabel = "current-context"
