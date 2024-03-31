"use server"
import {
  IWechatArticleDetail,
  wechatArticleDetailSchema,
} from "@/schema/wechat-article.detail"
import { prisma } from "../../../packages/common-db/providers/prisma"
import { fetchWechatArticle } from "../../../packages/common-wechat/article"
import { ICardBody } from "../../schema/card"
import { ICardGenOptions } from "../../store/card.atom"

export const fetchWechatArticleWithCache = async (
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
  console.log("-- fetched wechat article")

  const wechatArticleInDB = await prisma.wechatArticle.upsert({
    where: { id: id },
    create: wechatArticle,
    update: wechatArticle,
    ...wechatArticleDetailSchema,
  })
  // console.debug("-- article: ", article)
  return wechatArticle2card(wechatArticleInDB)
}

export const wechatArticle2card = (data: IWechatArticleDetail): ICardBody => {
  return {
    platform: "wechat-article",
    title: data.title!,
    content: data.contentMd!,
    images: [data.cover],
    sourceUrl: data.sourceUrl,
    summary: data.summary,
    stat: {
      reads: data.stat?.readnum,
      likes: data.stat?.likenum,
      comments: data.stat?.comment_count,
    },
    author: data.author,
    source: data.source,
    time: data.time,
  }
}
