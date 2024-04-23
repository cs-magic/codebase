import {
  CardPreviewEngineType,
  GenWxmpArticleCardFetchOptions,
  ICardInnerPreview,
  ICardPreview,
} from "@/schema/card"
import { cardSummaryOptionsAtom } from "@/store/card.llm.atom"
import {
  cardFetchCommentsEnabledAtom,
  cardFetchWithCacheAtom,
} from "@/store/card.query.atom"

import { getCardUrl } from "@/utils/get-card-url"
import { parseJsonSafe } from "@cs-magic/common/utils/parse-json-safe"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import {
  RequestApproachType,
  RequestOptions,
} from "../../../../core/wechat/wxmp-article/fetch/approaches/nodejs/requestPage"

import { BackendType } from "../../../../packages/llm/schema/llm.base"

export const cardArticleUrlAtom = atomWithStorage("url.toParse", "")

export const cardInnerInputAtom = atomWithStorage("card.inner.input", "")

export const cardUserIdAtom = atomWithStorage("card.user.id", "")
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "")
export const cardUserNameAtom = atomWithStorage("card.user.name", "")

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
)

export const cardNewContentAtom = atomWithStorage("card.new.content", "")

export const cardPreviewEngineAtom = atomWithStorage<CardPreviewEngineType>(
  "card.preview.engine",
  "modern-screenshot",
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

///////////////////////////////
// derived
//////////////////////////////

export const cardPreviewAtom = atom<ICardPreview | null>((get) => {
  const user = get(cardUserAtom)
  const llmResponseInput = get(cardInnerInputAtom)
  const inner = parseJsonSafe<ICardInnerPreview>(llmResponseInput)

  console.log({ llmResponseInput, inner })
  if (!inner) return null

  return {
    outer: {
      id: inner?.id,
      user,
    },
    inner: inner,
  }
})

export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}))

export const cardOssIdAtom = atom<string | null>((get) => {
  const preview = get(cardPreviewAtom)
  const id = preview?.outer?.id
  if (!id) return null
  return getCardUrl(id)
})

export const requestOptionsAtom = atom<RequestOptions>((get) => ({
  backendType: get(backendTypeAtom),
  approach: {
    type: get(requestApproachTypeAtom),
    headless: get(requestIsHeadlessAtom),
  },
}))

export const cardGenOptionsAtom = atom<GenWxmpArticleCardFetchOptions>(
  (get) => ({
    stat: {
      enabled: false,
    },
    comments: {
      enabled: get(cardFetchCommentsEnabledAtom),
    },
    withCache: get(cardFetchWithCacheAtom),
    detail: {
      request: get(requestOptionsAtom),
      llmResponse: get(cardSummaryOptionsAtom),
    },
  }),
)
