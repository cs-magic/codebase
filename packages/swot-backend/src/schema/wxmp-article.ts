import { sampleWxmpArticleComment } from "@cs-magic/common"
import { ICardPlatform } from "./card"
import { RequestOptions } from "./request"
import { SummaryOptions } from "./summary"
import { Card, LlmResponse } from "@prisma/client"

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
