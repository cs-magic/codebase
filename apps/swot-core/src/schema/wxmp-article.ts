import { SummaryOptions } from "@cs-magic/wechat/wxmp-article/fetch/approaches/nodejs/md2summary"

import { ICardPlatform } from "./card-platform.js"
import { RequestOptions } from "./request.js"

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
