import { RequestOptions } from "@cs-magic/swot-core/src/schema"
import { SummaryOptions } from "./approaches/nodejs/md2summary"

export type FetchWxmpArticleDetailOptions = {
  request?: RequestOptions
  summary?: SummaryOptions
}
