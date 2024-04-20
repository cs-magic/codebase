import { md2summary, SummaryOptions } from "./md2summary"
import { RequestOptions, requestPage } from "./requestPage"

export type FetchWxmpArticleDetailOptions = {
  request?: RequestOptions
  summary?: SummaryOptions
}

export const fetchWxmpArticleViaNodejs = async (
  url: string,
  options?: FetchWxmpArticleDetailOptions,
) => {
  const md = await requestPage(url, options?.request)
  const result = await md2summary(md, options?.summary)
  return result
}
