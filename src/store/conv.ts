import {
  IConvDetail,
  IConvSummary,
  IRequest,
  IResponse,
  IUpdateResponse,
} from "@/schema/conv"
import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { ISSERequest } from "../../packages/common/lib/sse/schema"
import { IContext, IMessageInChat } from "../schema/message"
import { appIdPersistedAtom } from "./app" //////////////////////////////

//////////////////////////////
// base
//////////////////////////////

export const convsFromServerAtom = atom<IConvSummary[]>([])

export const convDetailFromServerAtom = atomWithImmer<IConvDetail | null>(null)

/**
 * 用户选择哪条request，这个信息不在数据库存储，所以需要用户自己维护
 */
export const requestIdAtom = atom<string | null>(null)

//////////////////////////////
// derived
//////////////////////////////

export const requestsAtom = atom<IRequest[]>(
  (get) => get(convDetailFromServerAtom)?.requests ?? [],
)

export const requestSliderAtom = atom(
  (get) => {
    const requests = get(requestsAtom)
    return {
      current: requests.findIndex((r) => r.id === get(requestIdAtom)),
      total: requests.length,
    }
  },
  (get, set) => {
    const setN = (n: number) => {
      if (n < 0 || n > get(requestsAtom).length - 1) return
      set(requestIdAtom, get(requestsAtom)[Math.floor(n)]!.id)
    }
    const inc = () => setN(get(requestSliderAtom).current + 1)
    const dec = () => setN(get(requestSliderAtom).current - 1)
    return {
      setN,
      inc,
      dec,
    }
  },
)

export const convIdAtom = atom((get) => get(convDetailFromServerAtom)?.id)

export const requestAtom = atom((get) =>
  get(convDetailFromServerAtom)?.requests.find(
    (r) => r.id === get(requestIdAtom),
  ),
)

export const convAppsAtom = atom((get) => {
  const request = get(requestAtom)
  if (request) return request.responses.map((r) => r.app)
  return get(convDetailFromServerAtom)?.apps ?? []
})

export const commonContextAtom = atom<IContext>(
  (get) => get(requestAtom)?.context ?? [],
)

export const bestResponseAtom = atom<IResponse | undefined>((get) =>
  get(requestAtom)?.responses.find((r) => r.appId === get(appIdPersistedAtom)),
)

export const bestContextAtom = atom<IContext>((get) => {
  const commonContext = get(commonContextAtom)
  const bestResponse = get(bestResponseAtom)
  if (!bestResponse) return commonContext
  const { response, error, updatedAt } = bestResponse
  return [
    ...commonContext,
    {
      content: error ?? response ?? "",
      role: "assistant",
      isError: !!error,
      updatedAt,
    },
  ]
})

// export const responseAtom = atom(
//     (get) => get(requestAtom)?.responses.find((r) => r.appId === get(appIdPersistedAtom))
// )

export const checkRespondingAtom = atom((get) => (appId: string) => {
  const response = get(requestAtom)?.responses.find((r) => r.appId === appId)
  return !!response && !response.tEnd
})

/**
 * 客户端在线同步
 */
export const updateResponseAtom = atom(
  null,
  (
    get,
    set,
    requestId: string | null,
    appId: string,
    func: IUpdateResponse,
  ) => {
    set(convDetailFromServerAtom, (conv) => {
      const s = conv?.requests
        ?.find((r) => r.id === requestId)
        ?.responses.find((r) => r.appId === appId)

      if (!s) return

      func(s)
    })
  },
)
