import {
  IConvBase,
  IConvDetail,
  IRequest,
  IResponse,
  IUpdateAppResponse,
  IUpdateConvTitleResponse,
} from "@/schema/conv"
import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { IContext } from "../schema/message"
import { IBaseResponse } from "../schema/query"
import { ResponseStatus } from "../schema/sse"
import { appIdPersistedAtom } from "./app" //////////////////////////////

//////////////////////////////
// base
//////////////////////////////

export const serverConvListFAtom = atom<IConvBase[]>([])

export const serverConvDetailAtom = atomWithImmer<IConvDetail | null>(null)

//////////////////////////////
// derived
//////////////////////////////

export const requestsAtom = atom<IRequest[]>(
  (get) => get(serverConvDetailAtom)?.requests ?? [],
)

export const convIdAtom = atom((get) => get(serverConvDetailAtom)?.id)

export const requestAtom = atom((get) =>
  get(serverConvDetailAtom)?.requests.find(
    (r) => r.id === get(serverConvDetailAtom)?.currentRequestId,
  ),
)

/**
 * ~~用户选择哪条request，这个信息不在数据库存储，所以需要用户自己维护~~
 * 在加了数据库的currentRequestId之后，维护彼此的同步成了一种灾难，bug层出不穷，渲染效率低下
 */
export const requestIdAtom = atom((get) => get(requestAtom)?.id)

export const commonContextAtom = atom<IContext>(
  (get) => get(requestAtom)?.context ?? [],
)
export const responsesAtom = atom((get) => get(requestAtom)?.responses ?? [])

export const bestResponseAtom = atom<IResponse | undefined>((get) =>
  get(responsesAtom)?.find((r) => r.appId === get(appIdPersistedAtom)),
)

export const getAppResponseAtom = atom(
  (get) => (appId: string) => get(responsesAtom).find((r) => r.appId === appId),
)

export const bestContextAtom = atom<IContext>((get) => {
  const commonContext = get(commonContextAtom)
  const bestResponse = get(bestResponseAtom)
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

export const checkRespondingStatus = (
  response?: null | IBaseResponse,
): ResponseStatus => {
  if (!response) return "unknown"
  if (!response.tStart) return "to-response"
  if (response.tEnd) return "responded"
  return "responding"
}

export const responseFinishedAtom = atom<boolean>((get) =>
  get(responsesAtom)?.every((r) => checkRespondingStatus(r) !== "responding"),
)

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
    func: IUpdateAppResponse,
  ) => {
    set(serverConvDetailAtom, (conv) => {
      const s = conv?.requests
        ?.find((r) => r.id === requestId)
        ?.responses.find((r) => r.appId === appId)

      if (!s) return

      func(s)
    })
  },
)

export const updateConvTitleAtom = atom(
  null,
  (get, set, convId: string, func: IUpdateConvTitleResponse) => {
    set(serverConvDetailAtom, (conv) => {
      const s = conv?.titleResponse

      if (!s) return

      func(s)
    })
  },
)
