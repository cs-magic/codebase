import { $Enums } from "@prisma/client"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../utils/wxmp-article/detail/schema.js"

export type ICardPlatform<T extends $Enums.PlatformType = any> =
  T extends typeof $Enums.PlatformType.wxmpArticle
    ? {
        sn: string | null // 这个最重要
        __biz: string | null
        mid: string | null
        idx: string | null
        chksm: string | null
        stat?: IWechatArticleStat
        comments?: IWechatArticleComment[]
      }
    : object
