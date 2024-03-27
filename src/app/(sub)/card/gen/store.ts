import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { ICard, IMedia } from "../../../../schema/card"
import { extractFirstURL } from "./utils"

export type SourceType = "bilibili" | "xiaohongshu"
export const sourceTypeAtom = atomWithStorage<SourceType>(
  "source.type",
  "bilibili",
)

export type CardType =
  | "text"
  | "text-image"
  | "text-video"
  | "text-iframe"
  | "text-gif"
export const cardTypeAtom = atomWithStorage<CardType>("card.type", "text-image")

export const bilibiliVideoControlEnabledAtom = atomWithStorage(
  "bilibili.video.control.enabled",
  false,
)

export const urlToParseAtom = atomWithStorage("url.toParse", "")
export const urlParsedAtom = atom((get) => extractFirstURL(get(urlToParseAtom)))

// 用于bilibili
export const cardIFramesAtom = atom<IMedia[]>([])
// 用于小红书
export const cardVideosAtom = atom<IMedia[]>([])
export const cardImagesAtom = atom<IMedia[]>([])
export const cardContentAtom = atom("")
