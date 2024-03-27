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
