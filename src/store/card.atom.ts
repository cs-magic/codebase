import { Card } from "@prisma/client"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { IUserSummary } from "../schema/user.summary"
import { getCardUrl } from "../utils"

export const cardInputUrlAtom = atomWithStorage("url.toParse", "")

export const cardAtom = atom<Card | null>(null)
export const cardRenderedContentAtom = atom("")

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

export const cardUserIdAtom = atomWithStorage("card.user.id", "")
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "")
export const cardUserNameAtom = atomWithStorage("card.user.name", "")
export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}))

export const cardRenderStatusAtom = atom<
  "default" | "renderingMindmap" | "renderedMindmap"
>("default")

export const cardOssIdAtom = atom<string | null>((get) => {
  const body = get(cardAtom)
  return getCardUrl(
    !body ? undefined : { type: body.platformType, id: body.platformId },
  )
})

export const cardNewContentAtom = atomWithStorage("card.new.content", "")
