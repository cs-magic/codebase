"use server"

import { fetchWechatArticleContent } from "./content"
import { fetchDetail } from "./detail"
import { IFetchWechatArticleDetailConfig } from "./detail/schema"
import { IWechatArticle } from "./schema"

export const fetchWechatArticle = async (
  url: string,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<IWechatArticle> => {
  const content = await fetchWechatArticleContent(url)

  const detail = (await fetchDetail(url, detailConfig)).data ?? null

  return {
    url,
    content,
    diagram: null,
    detail,
  }
}
