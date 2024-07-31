import { atom } from "jotai"
import {
  cardFetchCommentsEnabledAtom,
  cardFetchStatEnabledAtom,
  cardFetchWithCacheAtom,
  cardReqOptionsAtom,
  cardWatermarkTextAtom,
} from "./card.request.atom"
import { cardSummaryOptionsAtom } from "./card.summary.atom"
import { GenWxmpArticleCardFetchOptions } from "@cs-magic/swot-backend/schema"

export const cardGenOptionsAtom = atom<GenWxmpArticleCardFetchOptions>(
  (get) => ({
    stat: {
      enabled: get(cardFetchStatEnabledAtom),
    },
    comments: {
      enabled: get(cardFetchCommentsEnabledAtom),
    },
    withCache: get(cardFetchWithCacheAtom),
    detail: {
      request: get(cardReqOptionsAtom),
      llmResponse: get(cardSummaryOptionsAtom),
    },
    watermark: {
      text: get(cardWatermarkTextAtom),
    },
  }),
)
