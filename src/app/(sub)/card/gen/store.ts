import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { ICard } from "../../../../components/card"

export type SourceType = "bilibili"
export const sourceTypeAtom = atomWithStorage<SourceType>(
  "source.type",
  "bilibili",
)

export type CardType = "text" | "text-image" | "text-video" | "text-gif"
export const cardTypeAtom = atomWithStorage<CardType>("card.type", "text-image")

export const bilibiliVideoControlEnabledAtom = atomWithStorage(
  "bilibili.video.control.enabled",
  false,
)

export const urlToParseAtom = atomWithStorage("url.toParse", "")

export const bilibiliIFrameUrlAtom = atom("")
export const bilibiliCoverUrlAtom = atom("")
export const bilibiliContentAtom = atom("")
