import { cardUserAtom } from "@/store/card.user.atom"

import { getOssKeyWithSuffix } from "@/utils/get-oss-key-with-suffix"
import { parseJsonSafe } from "../../../../packages-common/common/utils/parse-json"
import {
  ICardInnerPreview,
  ICardPreview,
} from "@cs-magic/p01-common/schema/card"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { getOssUrl } from "../../../../packages-to-classify/oss/utils"

export const cardArticleUrlAtom = atomWithStorage("url.toParse", "")

export const cardInnerInputAtom = atomWithStorage("card.inner.input", "")

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
)

export const cardNewContentAtom = atomWithStorage("card.new.content", "")

///////////////////////////////
// derived
//////////////////////////////

export const cardPreviewAtom = atom<ICardPreview | null>((get) => {
  const user = get(cardUserAtom)
  const llmResponseInput = get(cardInnerInputAtom)
  const inner = parseJsonSafe<ICardInnerPreview>(llmResponseInput)

  console.log({ llmResponseInput, inner })
  return {
    outer: {
      // todo: use outer.id instead of inner.id
      id: inner?.id ?? "",
      user,
    },
    inner,
  }
})

export const cardOssAtom = atom((get) => {
  const preview = get(cardPreviewAtom)
  const id = preview?.inner?.id
  console.log("-- cardOssId: ", { preview, id })
  if (!id) return null
  const key = getOssKeyWithSuffix(id)
  return {
    id,
    key,
    url: getOssUrl(key, {}),
  }
})
