import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { CardPreviewEngineType } from "@cs-magic/swot-core/src/schema/card"

export const cardMindmapRenderedAtom = atom(true)
// todo: 必须等思维导图有内容才可以生成卡片（大语言模型返回的思维导图可能是没有内容的）
export const cardMindmapHasContentAtom = atom(true)
export const cardCoverRenderedAtom = atom(false)
export const cardAuthorAvatarRenderedAtom = atom(false)
export const cardUserAvatarRenderedAtom = atom(false)

export const cardRenderedAtom = atom((get) => {
  const cover = get(cardCoverRenderedAtom)
  const mindmap = get(cardMindmapRenderedAtom)
  const user = get(cardUserAvatarRenderedAtom)
  const author = get(cardAuthorAvatarRenderedAtom)
  const rendered = cover && mindmap && author && user
  // && user // puppet-web 可能获取不到avatar
  console.log({ cover, mindmap, user, author, rendered })
  return rendered
})

export const cardPreviewEngineAtom = atomWithStorage<CardPreviewEngineType>(
  "card.preview.engine",
  "modern-screenshot",
)
