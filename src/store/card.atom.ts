import { IUserBasic } from "@/schema/user.summary"
import { atom } from "jotai"
import { withImmer } from "jotai-immer"
import { atomWithStorage } from "jotai/utils"
import { parseJS } from "../../packages/common-common/safe-parse-json"
import { BackendEngineType } from "../../packages/common-common/schema"
import { LLMModelType } from "../../packages/common-llm/schema/providers"
import { ICardGenOptions } from "../schema/card"
import { ICardDetail } from "../schema/card.basic"
import { getCardUrl } from "../utils"

export const cardInputAtom = atomWithStorage("card.input", "")

export const cardInputUrlAtom = atomWithStorage("url.toParse", "")
export const cardInputUrlsAtom = withImmer(
  atomWithStorage<{ url: string; disabled?: boolean }[]>("urls.toParse", []),
)

export const cardUserIdAtom = atomWithStorage("card.user.id", "")
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "")
export const cardUserNameAtom = atomWithStorage("card.user.name", "")

export const cardGeneratingAtom = atom(false)
export const cardResettingAtom = atom(false)
export const cardCopyingAtom = atom(false)
export const cardDownloadingAtom = atom(false)
export const cardUploadingAtom = atom(false)
export const cardMindmapRenderedAtom = atom(true)
export const cardCoverRenderedAtom = atom(false)
export const cardAuthorRenderedAtom = atom(false)
export const cardUserRenderedAtom = atom(false)

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
)

export const cardNewContentAtom = atomWithStorage("card.new.content", "")

export const cardRefetchPageAtom = atomWithStorage("card.page.refetch", false)
export const summaryModelAtom = atomWithStorage<LLMModelType>(
  "card.summary.model",
  "gpt-3.5-turbo", // gpt-3.5-turbo
)
export const cardRefetchCardAtom = atomWithStorage("card.stat.refetch", false)
export const cardRefetchCommentsAtom = atomWithStorage(
  "card.comments.refetch",
  false,
)
export const cardFetchEngineAtom = atomWithStorage<BackendEngineType>(
  "card.fetch-engine",
  "nodejs",
)

export const cardLLMTypeAtom = atomWithStorage<LLMModelType>(
  "card.llm.type",
  "gpt-3.5-turbo",
)

export const cardLLMEnabledAtom = atomWithStorage(
  "card.llm-model.enabled",
  true,
)

export const cardMdWithImgAtom = atomWithStorage("card.md-with-img", false)

export type CardPreviewEngine =
  | "html2image"
  | "html2canvas"
  | "modern-screenshot"
export const cardPreviewEngineAtom = atomWithStorage<CardPreviewEngine>(
  "card.preview.engine",
  "modern-screenshot",
)

///////////////////////////////
// derived
//////////////////////////////

export const cardAtom = atom<ICardDetail | null>((get) => {
  return parseJS<ICardDetail>(get(cardInputAtom))
})

export const cardRenderedAtom = atom((get) => {
  const cover = get(cardCoverRenderedAtom)
  const mindmap = get(cardMindmapRenderedAtom)
  const user = get(cardUserRenderedAtom)
  const author = get(cardAuthorRenderedAtom)
  const rendered = cover && mindmap && user && author

  // console.log({ cover, mindmap, user, author, rendered })
  return rendered
})

export const cardUserAtom = atom<IUserBasic>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  avatar: get(cardUserAvatarAtom),
}))

export const cardOssIdAtom = atom<string | null>((get) => {
  const card = get(cardAtom)
  return getCardUrl(
    !card ? undefined : { type: card.platformType, id: card.platformId },
  )
})

export const cardGenOptionsAtom = atom<ICardGenOptions>((get) => ({
  backendEngineType: get(cardFetchEngineAtom),
  mdWithImg: get(cardMdWithImgAtom),
  refetchPage: get(cardRefetchPageAtom),
  summaryModel: get(summaryModelAtom),
  refetchStat: get(cardRefetchCardAtom),
  refetchComments: get(cardRefetchCommentsAtom),
}))
