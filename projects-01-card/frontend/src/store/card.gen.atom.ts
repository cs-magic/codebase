import { cardSummaryOptionsAtom } from "@/store/card.summary.atom"
import {
  cardFetchCommentsEnabledAtom,
  cardFetchWithCacheAtom,
  cardReqOptionsAtom,
} from "@/store/card.request.atom"
import { GenWxmpArticleCardFetchOptions } from "@cs-magic/p01-common/schema/card"
import { atom } from "jotai"

export const cardGenOptionsAtom = atom<GenWxmpArticleCardFetchOptions>(
  (get) => ({
    stat: {
      enabled: false,
    },
    comments: {
      enabled: get(cardFetchCommentsEnabledAtom),
    },
    withCache: get(cardFetchWithCacheAtom),
    detail: {
      request: get(cardReqOptionsAtom),
      llmResponse: get(cardSummaryOptionsAtom),
    },
  }),
)
