import { SummaryOptions } from "@cs-magic/wechat/wxmp-article/fetch/approaches/nodejs/md2summary"
import { ICardPlatform } from "./card-platform"
import { RequestOptions } from "./index"

export type IWxmpArticleUrlParsed = {
  platformId?: string
  platformData: ICardPlatform<"wxmpArticle">
}

export type FetchWxmpArticleDetailOptions = {
  request?: RequestOptions
  summary?: SummaryOptions
}
