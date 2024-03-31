import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { CardType, ICardBody } from "../schema/card"

export const cardInputUrlAtom = atomWithStorage("url.toParse", "")

export const cardTypeAtom = atomWithStorage<CardType>("card.type", "text-image")
export const cardBodyAtom = atom<ICardBody | null>(null)
export const cardRenderedContentAtom = atom("")
export const bilibiliVideoControlEnabledAtom = atomWithStorage(
  "bilibili.video.control.enabled",
  false,
)

export const cardCommentsEnabledAtom = atomWithStorage(
  "card.detail.comments.enabled",
  false,
)
export const cardStatEnabledAtom = atomWithStorage(
  "card.detail.stat.enabled",
  false,
)
export const cardCommentsCacheIgnoredAtom = atomWithStorage(
  "card.detail.comments.cache.ignored",
  false,
)
export const cardStatCacheIgnoredAtom = atomWithStorage(
  "card.detail.stat.cache.ignored",
  false,
)
export const cardSummaryEnabledAtom = atomWithStorage(
  "card.summary.enabled",
  true,
)
export const cardSummaryCacheIgnoredAtom = atomWithStorage(
  "card.summary.cache.ignored",
  false,
)

export type ICardGenOption = {
  enabled: boolean
  cacheIgnored: boolean
}
export type ICardGenOptions = {
  summary: ICardGenOption
  stat: ICardGenOption
  comments: ICardGenOption
}
export const cardGenOptionsAtom = atom<ICardGenOptions>((get) => ({
  summary: {
    enabled: get(cardSummaryEnabledAtom),
    cacheIgnored: get(cardSummaryCacheIgnoredAtom),
  },
  stat: {
    enabled: get(cardStatEnabledAtom),
    cacheIgnored: get(cardStatCacheIgnoredAtom),
  },
  comments: {
    enabled: get(cardCommentsEnabledAtom),
    cacheIgnored: get(cardCommentsCacheIgnoredAtom),
  },
}))
