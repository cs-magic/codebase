import { Card, LlmResponse } from "@prisma/client"

import { sampleWxmpArticleComment } from "@cs-magic/common/dist/sample.js"

import { ICardPlatform } from "./card.js"
import { RequestOptions } from "./request.js"
import { SummaryOptions } from "./summary.js"

export type IWxmpArticleUrlParsed = {
  platformId?: string
  platformData: ICardPlatform<"wxmpArticle">
}

export type FetchWxmpArticleDetailOptions = {
  request?: RequestOptions
  summary?: SummaryOptions
}
export type GenWxmpArticleCardFetchOptions = {
  // 1. cache
  withCache?: boolean

  // 2. detail
  detail?: FetchWxmpArticleDetailOptions

  // 3. extra
  stat?: {
    enabled?: boolean
  }

  comments?: {
    enabled?: boolean
  }

  watermark?: {
    text?: string
  }
}
export type IFetchWechatArticleStat = {
  // query
  uin: string
  key: string
  __biz: string

  // form
  mid: string
  sn: string
  idx: "1" // todo ?
  is_only_read: "1"
}
export type IWechatArticleStat = {
  readnum: number
  likenum: number
  oldlikenum: number
  comment_count: number
  biz: string
}
export type IWechatArticleComment = typeof sampleWxmpArticleComment
export type FetchWxmpArticleRes = { article: Card; llmResponse: LlmResponse }
