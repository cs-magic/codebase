"use server"

import { prisma } from "../../../../packages/common-db/providers/prisma"
import { fetchWechatArticle } from "../../../../packages/common-wechat/article"
import { wechatArticleDetailSchema } from "../../../schema/wechat-article.detail"
import { ICardGenOptions } from "../../../store/card.atom"
import { wechatArticle2card } from "./to-card"

export const fetchWechatArticleWithCacheAction = async (
  url: string,
  options: ICardGenOptions,
) => {
  const wechatArticle = await fetchWechatArticle(
    url,
    options,
    async (id) =>
      await prisma.wechatArticle.findUnique({
        where: { id },
      }),
  )
  console.log("-- wechat article fetched")

  const wechatArticleInDB = await prisma.wechatArticle.upsert({
    where: { id: wechatArticle.id },
    create: wechatArticle,
    update: wechatArticle,
    ...wechatArticleDetailSchema,
  })
  console.log("-- wechat article upserted")

  return wechatArticle2card(wechatArticleInDB)
}
