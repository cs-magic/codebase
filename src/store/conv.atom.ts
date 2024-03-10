import {
  IConvBase,
  IConvDetail,
  IRequest,
  IResponse,
  IUpdateResponse,
} from "@/schema/conv"
import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { LogLevel } from "../../packages/common-log/schema"
import { IContext } from "../schema/message"
import { checkRespondingStatus } from "../utils"
import { appIdPersistedAtom } from "./app.atom"

//////////////////////////////
// base
//////////////////////////////

export const convsAtom = atomWithImmer<IConvBase[]>([])

export const convAtom = atomWithImmer<IConvDetail | null>(null)

export const convLogLevelAtom = atomWithStorage<LogLevel>(
  "conv.log.level",
  LogLevel.info,
)

export const requestsSlideTextDisplayAtom = atomWithStorage(
  "requests.slide.text.display",
  false,
)

//////////////////////////////
// derived
//////////////////////////////
export const convIdAtom = atom((get) => get(convAtom)?.id ?? null)

/**
 * ~~用户选择哪条request，这个信息不在数据库存储，所以需要用户自己维护~~
 * ~~在加了数据库的currentRequestId之后，维护彼此的同步成了一种灾难，bug层出不穷，渲染效率低下~~
 * 当前requestId始终从convs里拿，不要关心conv，conv只维护更重要的数据
 */
export const requestIdAtom = atom(
  (get) =>
    get(convsAtom).find((c) => c.id === get(convIdAtom))?.currentRequestId ??
    null,
)

export const requestsAtom = atom<IRequest[]>(
  (get) => get(convAtom)?.requests ?? [],
)

export const requestAtom = atom(
  (get) => get(requestsAtom).find((r) => r.id === get(requestIdAtom)) ?? null,
)

export const commonContextAtom = atom<IContext>(
  (get) => get(requestAtom)?.context ?? [],
)

export const responsesAtom = atom<IResponse[]>(
  (get) => get(requestAtom)?.responses ?? [],
)

export const bestContextAtom = atom<IContext>((get) => {
  const commonContext = get(commonContextAtom)
  const bestResponse = get(responsesAtom)?.find(
    (r) => r.appId === get(appIdPersistedAtom),
  )
  if (!bestResponse) return commonContext
  const { content, error, updatedAt } = bestResponse
  return [
    ...commonContext,
    {
      content: error ?? content ?? "",
      role: "assistant",
      isError: !!error,
      updatedAt,
    },
  ]
})

export const responseFinishedAtom = atom<boolean>((get) =>
  get(responsesAtom)?.every((r) => checkRespondingStatus(r) !== "responding"),
)

//////////////////////////////
// functions
//////////////////////////////

/**
 * 客户端在线同步
 */
export const updateAppResponseAtom = atom(
  null,
  (
    get,
    set,
    requestId: string | null,
    appId: string,
    func: IUpdateResponse,
  ) => {
    set(convAtom, (conv) => {
      const r = conv?.requests
        ?.find((r) => r.id === requestId)
        //   todo: r.appClientId === appId
        ?.responses.find((r) => r.appId === appId)

      if (r) func(r)
    })
  },
)

export const updateConvTitleAtom = atom(
  null,
  (get, set, convId: string | undefined, func: IUpdateResponse) => {
    set(convsAtom, (convs) => {
      const r = convs.find((c) => c.id === convId)?.titleResponse
      if (r) func(r)
    })
  },
)
