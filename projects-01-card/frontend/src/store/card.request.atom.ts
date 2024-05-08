import {
  RequestApproachType,
  RequestOptions,
} from "@cs-magic/wechat/wxmp-article/fetch/approaches/nodejs/requestPage"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { BackendType } from "../../../../packages-core/llm/schema/llm.base"

export const cardFetchWithCacheAtom = atomWithStorage<boolean>(
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
