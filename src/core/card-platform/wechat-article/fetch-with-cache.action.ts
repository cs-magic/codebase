"use server"

import parse from "node-html-parser"
import { api } from "../../../../packages/common-api"
import { fetchArticleSummary } from "../../../../packages/common-article/core"
import { IArticleSummaryParsed } from "../../../../packages/common-article/schema"
import { parseSummary } from "../../../../packages/common-article/utils"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import { parseMetaFromHtml } from "../../../../packages/common-html/utils"
import { html2md } from "../../../../packages/common-markdown/html2md"
import {
  fetchWechatArticleComments,
  fetchWechatArticleStat,
} from "../../../../packages/common-platform-wechat/article/detail/providers/wxapi"
import {
  IWechatArticleComment,
  IWechatArticleStat,
} from "../../../../packages/common-platform-wechat/article/detail/schema"
import { ICardPlatform, IMedia } from "../../../schema/card"
import { cardBasicSchema } from "../../../schema/card.basic"
import { IUserSummary } from "../../../schema/user.summary"
import { ICardGenOptions } from "../../../store/card.atom"
import { $Enums } from ".prisma/client"
import PlatformType = $Enums.PlatformType

export const fetchWechatArticleAction = async (
  sourceUrl: string,
  options: ICardGenOptions,
) => {
  const platformType: PlatformType = "wechatArticle"
  console.log("-- fetchWechatArticle: ", { url: sourceUrl })

  // 1. fetch page
  const { data: pageText } = await api.get<string>(sourceUrl)

  // 2. parse page
  const html = parse(pageText)
  const ogUrl = parseMetaFromHtml(html, "og:url", "property")

  // 2.1. get id(sn) from page
  const platformId = /sn=(.*?)&/.exec(ogUrl ?? "")![1]!

  // 2.1.1 get data from id
  const dataInDB = await prisma.card.findUnique({
    where: { platformType_platformId: { platformType, platformId } },
  })

  const contentHtml = html.getElementById("page-content")?.innerHTML ?? null
  const title = parseMetaFromHtml(html, "og:title")
  const coverUrl = parseMetaFromHtml(html, "og:image")!
  const cover: IMedia = {
    url: coverUrl,
  }
  // const source = "公众号"
  const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  const time =
    new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null // 1711455495
  const author: IUserSummary = {
    name: parseMetaFromHtml(html, "author", "name"),
    image: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1] ?? null,
    id: /var user_name = "(.*?)"/.exec(pageText)?.[1] ?? "",
  }
  let comments: IWechatArticleComment[] | null | undefined = undefined
  let stat: IWechatArticleStat | null | undefined = undefined
  let contentMd: string | null | undefined = undefined
  let summary: IArticleSummaryParsed | null | undefined = undefined
  const platformData: ICardPlatform<"wechatArticle"> = {}

  if (contentHtml) {
    contentMd = html2md(contentHtml)

    // 2.1. cache summary
    if (!options.summary.cacheIgnored) {
      summary = dataInDB?.summary
      if (summary) console.log("-- summary cached")
    }

    // 2.2. fetch summary
    if (options.summary.enabled && !summary) {
      console.log("-- summary fetching")
      const summaryContent = (await fetchArticleSummary(contentMd)) ?? null
      summary = parseSummary(summaryContent)
    }
  }

  // 3.1. stat
  if (options.stat.enabled) {
    if (!options.stat.cacheIgnored) stat = dataInDB?.stat
    if (!stat) stat = (await fetchWechatArticleStat(platformId)).data
  }

  // 3.2. comments
  if (options.comments.enabled) {
    if (!options.comments.cacheIgnored)
      platformData.comments = dataInDB?.platformData.comments // todo: type safe
    if (!comments)
      comments = (await fetchWechatArticleComments(platformId)).data
  }

  const wechatArticleInDB = await prisma.card.upsert({
    where: { platformType_platformId: { platformId, platformType } },
    create: {
      platformType,
      platformId,

      author,
      time,
      title,
      cover,
      stat,
      platformData,
      contentMd,
      summary,
      sourceUrl,
    },
    update: {
      author,
      time,
      title,
      cover,
      stat,
      platformData,
      contentMd,
      summary,
      sourceUrl,
    },
    ...cardBasicSchema,
  })

  console.log("-- wechat article upserted: ", {
    platformId,
    sourceUrl,
    source,
    author,
    time,
    title,
    cover,
    length: {
      html: contentHtml?.length,
      md: contentMd?.length,
    },
    summary,
    stat,
    comments: {
      length: comments?.length,
      first: comments?.[0],
    },
  })

  return wechatArticleInDB
}
