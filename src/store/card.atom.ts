import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { extractFirstURL } from "../../packages/common-utils/parse-url"
import { CardType, IMedia, PlatformType } from "../schema/card"

export const realtimeContentAtom = atom("")
export const platformTypeAtom = atomWithStorage<PlatformType>(
  "platform.type",
  "bilibili",
)
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
