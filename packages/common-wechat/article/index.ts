"use server"

import { IUserSummary } from "@/schema/user.summary"
import { Prisma } from "@prisma/client"
import parse from "node-html-parser"
import { api } from "../../common-api"
import { fetchArticleSummary } from "../../common-article/core"
import { IArticleSummary } from "../../common-article/schema"
import { parseSummary } from "../../common-article/utils"
import { parseMetaFromHtml } from "../../common-html/utils"
import { html2md } from "../../common-markdown/html2md"
import { fetchWechatArticleDetailViaWxapi } from "./detail/providers/wxapi"
import {
  IFetchWechatArticleDetailConfig,
  IWechatArticleComment,
  IWechatArticleDetail,
  IWechatArticleStat,
} from "./detail/schema"
import { IFetchWechatArticleSummaryConfig } from "./schema"
import { getWechatArticleUrlFromId } from "./utils"
import WechatArticleUncheckedCreateInput = Prisma.WechatArticleUncheckedCreateInput

export const fetchWechatArticle = async (
  id: string,
  summaryConfig?: IFetchWechatArticleSummaryConfig,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<WechatArticleUncheckedCreateInput> => {
  const url = getWechatArticleUrlFromId(id)
  console.log("-- fetchWechatArticle: ", { id, url })

  // 1. fetch page
  const { data: pageText } = await api.get<string>(url)

  // 2. parse page
  const html = parse(pageText)
  const contentHtml = html.getElementById("page-content")?.innerHTML ?? null
  const title = parseMetaFromHtml(html, "og:title")
  const coverUrl = parseMetaFromHtml(html, "og:image")
  // const source = "公众号"
  const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  const time =
    new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null // 1711455495
  const author: IUserSummary = {
    name: parseMetaFromHtml(html, "author", "name"),
    image: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1] ?? null,
    id: /var user_name = "(.*?)"/.exec(pageText)?.[1] ?? "",
  }
  let comments: IWechatArticleComment[] = []
  let stat: IWechatArticleStat | null = null
  let contentMd: string | null = null
  let summary: IArticleSummary | null = null

  if (contentHtml) {
    contentMd = html2md(contentHtml)

    // 2.1. cache summary
    if (summaryConfig?.get) {
      summary = await summaryConfig.get(id)
      if (summary) console.log("-- summary cached: ", summary)
    }

    // 2.2. fetch summary
    if (!summary) {
      summary = await fetchArticleSummary(contentMd)
    }
  }
  console.log("-- summary: ", summary)

  // 3. detail
  if (detailConfig) {
    const { provider, get } = detailConfig

    let detail: IWechatArticleDetail | null = null
    // 3.1. cache detail
    if (get) {
      detail = await get(id)
      if (detail) console.log("-- detail cached")
    }

    // 3.2 fetch detail
    if (!detail) {
      console.log("-- detail fetching")

      const data = await fetchWechatArticleDetailViaWxapi(id)
      if (data.success) {
        detail = data.data
        console.log("-- detailed fetched")
      }
    }

    if (detail?.stat) stat = detail.stat
    if (detail?.comments) comments = detail.comments
  }

  console.log("-- summary1: ", summary)
  const summary2 = parseSummary(summary)
  console.log("-- summary2: ", summary2)

  return {
    id,
    sourceUrl: getWechatArticleUrlFromId(id),
    comments,
    author,
    summary: summary2,
    contentMd,
    contentHtml,
    cover: {
      url: coverUrl,
    },
    source,
    title,
    stat,
    time,
  }
}
