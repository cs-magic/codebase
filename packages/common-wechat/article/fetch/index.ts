"use server"

import { Prisma } from "@prisma/client"
import { getWechatArticleUrlFromId } from "../utils"
import { fetchWechatArticleDetail } from "./detail"
import { IFetchWechatArticleDetailConfig } from "./detail/schema"
import { fetchWechatArticleSummary } from "./summary"
import { IFetchWechatArticleSummaryConfig } from "./summary/schema"
import WechatArticleUncheckedCreateInput = Prisma.WechatArticleUncheckedCreateInput

export const fetchWechatArticle = async (
  id: string,
  summaryConfig?: IFetchWechatArticleSummaryConfig,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<WechatArticleUncheckedCreateInput> => {
  const content = await fetchWechatArticleSummary(id, summaryConfig)
  const detail = await fetchWechatArticleDetail(id, detailConfig)

  return {
    id,
    ...content,
    ...detail,
    sourceUrl: getWechatArticleUrlFromId(id),
  }
}
