import { $Enums } from "@prisma/client"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../packages/common-platform-wechat/article/detail/schema"

export type ICardPlatform<T extends $Enums.PlatformType> =
  T extends "wechatArticle"
    ? {
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
