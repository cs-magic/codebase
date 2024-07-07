import { RequestApproachType } from "@cs-magic/swot-core/schema/card"
import { RequestOptions } from "@cs-magic/swot-core/schema/request"
import { atom, PrimitiveAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { BackendType } from "@cs-magic/llm/schema/llm.base"

export const cardFetchWithCacheAtom = atomWithStorage(
  "card.fetch.with-cache",
  true,
)
export const cardFetchEngineAtom = atomWithStorage<BackendType>(
  "card.fetch-engine",
  "nodejs",
)

export const cardFetchStatEnabledAtom = atomWithStorage(
  "card.stat.refetch",
  false,
)
export const cardFetchCommentsEnabledAtom = atomWithStorage(
  "card.comments.refetch",
  false,
)

export const cardWatermarkTextAtom = atomWithStorage(
  "card.watermark.text",
  // "飞脑体验版",
  "",
)

export const backendTypeAtom = atomWithStorage<BackendType>(
  "backend.type",
  "nodejs",
)
export const requestApproachTypeAtom = atomWithStorage<RequestApproachType>(
  "request.approach.type",
  "simulate",
)
export const requestIsHeadlessAtom = atomWithStorage("request.headless", true)

export const cardReqOptionsAtom = atom<RequestOptions>((get) => ({
  backendType: get(backendTypeAtom),
  approach: {
    type: get(requestApproachTypeAtom),
    headless: get(requestIsHeadlessAtom),
  },
}))
//
// export const func = (atom: PrimitiveAtom<boolean>) => {}
//
// func(cardFetchWithCacheAtom)
