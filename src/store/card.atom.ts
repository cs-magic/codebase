import { Card } from "@prisma/client"
import { atom } from "jotai"
import { atomWithImmer, withImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { createBoolStorageAtom } from "../../packages/common-state-management/jotai/create-atom"
import { ICardGenOptions } from "../schema/card"
import { IUserSummary } from "../schema/user.summary"
import { getCardUrl } from "../utils"

const createCardBoolStorageAtom = (s: string, init = false) =>
  createBoolStorageAtom(s, init, "card")

export const cardAtom = withImmer(
  atomWithStorage<Card>("card", {
    id: "",

    platformType: "wechatArticle",
    platformId: "",

    contentSummary: null,
    stat: null,
    author: null,
    model: null,
    cover: null,
    time: null,
    createdAt: null,
    updatedAt: null,
    contentMd: null,
    sourceUrl: null,
    title: null,
    description: null,
    platformData: null,
    iFrames: [],
    videos: [],
    images: [],
  }),
)

export const cardInputUrlAtom = atomWithStorage("url.toParse", "")
export const cardInputUrlsAtom = withImmer(
  atomWithStorage<{ url: string; disabled?: boolean }[]>("urls.toParse", []),
)

export const cardUserIdAtom = atomWithStorage("card.user.id", "")
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "")
export const cardUserNameAtom = atomWithStorage("card.user.name", "")

export const cardControls = [
  createCardBoolStorageAtom("summary.enabled", true),
  createCardBoolStorageAtom("summary.cache.enabled"),
  createCardBoolStorageAtom("stat.enabled"),
  createCardBoolStorageAtom("stat.cache.enabled"),
  createCardBoolStorageAtom("comments.enabled"),
  createCardBoolStorageAtom("comments.cache.enabled"),
]

export const cardGeneratingAtom = atom(false)
export const cardCopyingAtom = atom(false)
export const cardDownloadingAtom = atom(false)
export const cardUploadingAtom = atom(false)
export const cardRenderedAtom = atom(false)

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
)

export const cardNewContentAtom = atomWithStorage("card.new.content", "")

///////////////////////////////
// derived
//////////////////////////////

export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}))

export const cardOssIdAtom = atom<string | null>((get) => {
  const body = get(cardAtom)
  return getCardUrl(
    !body ? undefined : { type: body.platformType, id: body.platformId },
  )
})

export const cardGenOptionsAtom = atom<ICardGenOptions>((get) => ({
  summary: {
    enabled: get(cardControls[0]!.atom),
    cacheIgnored: get(cardControls[1]!.atom),
  },
  stat: {
    enabled: get(cardControls[2]!.atom),
    cacheIgnored: get(cardControls[3]!.atom),
  },
  comments: {
    enabled: get(cardControls[4]!.atom),
    cacheIgnored: get(cardControls[5]!.atom),
  },
}))
