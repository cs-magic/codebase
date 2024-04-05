import { Card } from "@prisma/client"
import { atom } from "jotai"
import { withImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { FetchEngine } from "../../packages/common-general/schema"
import { ICardGenOptions } from "../schema/card"
import { IUserSummary } from "../schema/user.summary"
import { getCardUrl } from "../utils"

export const cardAtom = withImmer(
  atomWithStorage<Card>("card", {
    id: "",

    platformType: "wxmpArticle",
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

export const refetchCardPageAtom = atomWithStorage("card.page.refetch", false)
export const refetchCardSummaryAtom = atomWithStorage(
  "card.summary.refetch",
  false,
)
export const refetchCardStatAtom = atomWithStorage("card.stat.refetch", false)
export const refetchCardCommentsAtom = atomWithStorage(
  "card.comments.refetch",
  false,
)
export const cardFetchEngineAtom = atomWithStorage<FetchEngine>(
  "card.fetch-engine",
  "fastapi",
)

export const cardMdWithImgAtom = atomWithStorage("card.md-with-img", false)

///////////////////////////////
// derived
//////////////////////////////

export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}))

export const cardOssIdAtom = atom<string | null>((get) => {
  const card = get(cardAtom)
  return getCardUrl(
    !card ? undefined : { type: card.platformType, id: card.platformId },
  )
})

export const cardGenOptionsAtom = atom<ICardGenOptions>((get) => ({
  fetchEngine: get(cardFetchEngineAtom),
  mdWithImg: get(cardMdWithImgAtom),
  refetchPage: get(refetchCardPageAtom),
  refetchSummary: get(refetchCardSummaryAtom),
  refetchStat: get(refetchCardStatAtom),
  refetchComments: get(refetchCardCommentsAtom),
}))
