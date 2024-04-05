import { $Enums } from "@prisma/client"
import { FetchEngine } from "../../packages/common-general/schema"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../packages/common-platform-wechat/article/detail/schema"

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

export type IModel = {
  name: string
}

export type ActionType = "generate" | "copy" | "download" | "upload"

export type ICardGenOptions = {
  fetchEngine?: FetchEngine
  mdWithImg?: boolean
  refetchPage?: boolean
  refetchSummary?: boolean
  refetchStat?: boolean
  refetchComments?: boolean
}
