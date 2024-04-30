import { CardPreviewEngineType } from "@cs-magic/p01-common/schema/card"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const cardMindmapRenderedAtom = atom(true)
export const cardCoverRenderedAtom = atom(false)
export const cardAuthorRenderedAtom = atom(false)
export const cardUserRenderedAtom = atom(false)

export const cardRenderedAtom = atom((get) => {
  const cover = get(cardCoverRenderedAtom)
  const mindmap = get(cardMindmapRenderedAtom)
  const user = get(cardUserRenderedAtom)
  const author = get(cardAuthorRenderedAtom)
  const rendered = cover && mindmap && author && user
  // && user // puppet-web 可能获取不到avatar
  console.log({ cover, mindmap, user, author, rendered })
  return rendered
})

export const cardPreviewEngineAtom = atomWithStorage<CardPreviewEngineType>(
  "card.preview.engine",
  "modern-screenshot",
)
