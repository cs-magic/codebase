"use server"
import {
  IWechatArticleDetail,
  wechatArticleDetailSchema,
} from "@/schema/wechat-article.detail"
import { prisma } from "../../../packages/common-db/providers/prisma"
import { fetchWechatArticle } from "../../../packages/common-wechat/article"
import { ICardBody } from "../../schema/card"

export const fetchWechatArticleWithCache = async (id: string) => {
  const dataInDB = await prisma.wechatArticle.findUnique({
    where: { id },
  })

  const article = await fetchWechatArticle(
    id,
    {
      get: async (id) => dataInDB?.contentSummary ?? null,
    },
    {
      provider: "wxapi",
      get: async (url) =>
        // obj
        dataInDB?.stat !== null
          ? {
              stat: dataInDB?.stat,
              comments: dataInDB?.comments ?? [],
            }
          : null,
    },
  )
  const wechatArticle = await prisma.wechatArticle.upsert({
    where: { id: id },
    create: article,
    update: article,
    ...wechatArticleDetailSchema,
  })
  // console.debug("-- article: ", article)
  return wechatArticle2card(wechatArticle)
}

export const wechatArticle2card = (data: IWechatArticleDetail): ICardBody => {
  return {
    platform: "wechat-article",
    title: data.title!,
    content: data.contentMd!,
    images: [data.cover],
    sourceUrl: data.sourceUrl,
    mindmap: data.contentSummary,
    stat: {
      reads: data.stat.readnum,
      likes: data.stat.likenum,
      comments: data.stat.comment_count,
    },
    author: data.author,
    source: data.source,
    time: data.time,
  }
}
