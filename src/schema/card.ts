import { $Enums } from "@prisma/client"
import { IArticleSummaryParsed } from "../../packages/common-article/schema"
import { FetchEngine } from "../../packages/common-general/schema"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../packages/common-platform-wechat/wxmp-article/detail/schema"

export type ICardPlatform<T extends $Enums.PlatformType> =
  T extends "wechatArticle"
    ? {
        shortId?: string
        longId: string
        stat?: IWechatArticleStat
        comments?: IWechatArticleComment[]
      }
    : object

export type ICardStat = {
  reads?: number
  likes?: number
  comments?: number
}

export type IMedia = {
  url: string
  ratio?: number
}

export type ISummary = {
  modelType: string
  result: string
}

export type ISummaryParsed = {
  modelType?: string
  result?: IArticleSummaryParsed
}

export type Action1Type = "generate" | "reset"
export type Action2Type = "copy" | "download" | "upload"
export type ActionType = Action1Type | Action2Type

export type ICardGenOptions = {
  fetchEngine?: FetchEngine
  mdWithImg?: boolean
  refetchPage?: boolean
  refetchSummary?: boolean
  refetchStat?: boolean
  refetchComments?: boolean
}
