"use server"

import { prisma } from "../../../../packages/common-db/providers/prisma"
import { fetchWechatArticle } from "../../../../packages/common-wechat/article"
import { wechatArticleDetailSchema } from "../../../schema/wechat-article.detail"
import { ICardGenOptions } from "../../../store/card.atom"
import { wechatArticle2card } from "./to-card"

export const fetchWechatArticleWithCacheAction = async (
  id: string,
  options: ICardGenOptions,
) => {
  const dataInDB = await prisma.wechatArticle.findUnique({
    where: { id },
  })

  const wechatArticle = await fetchWechatArticle(
    id,
    options,
    (id) => dataInDB?.summary ?? null,
    () => dataInDB?.stat ?? null,
    () => dataInDB?.comments ?? null,
  )
  console.log("-- wechat article fetched")

  const wechatArticleInDB = await prisma.wechatArticle.upsert({
    where: { id: id },
    create: wechatArticle,
    update: wechatArticle,
    ...wechatArticleDetailSchema,
  })
  console.log("-- wechat article upserted")

  return wechatArticle2card(wechatArticleInDB)
}
