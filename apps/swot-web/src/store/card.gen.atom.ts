import { cardSummaryOptionsAtom } from "@/store/card.summary.atom"
import {
  cardFetchCommentsEnabledAtom,
  cardFetchStatEnabledAtom,
  cardFetchWithCacheAtom,
  cardReqOptionsAtom,
  cardWatermarkTextAtom,
} from "@/store/card.request.atom"
import { GenWxmpArticleCardFetchOptions } from "@cs-magic/wechat/schema/card"
import { atom } from "jotai"

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
