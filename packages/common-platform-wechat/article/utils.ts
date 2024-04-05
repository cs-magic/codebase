import { env } from "@/env"
import { IUserSummary } from "@/schema/user.summary"
import parse from "node-html-parser"
import { FetchEngine } from "packages/common-general/schema"
import { api } from "../../common-api"
import { parseMetaFromHtml } from "../../common-html/utils"
import { html2md } from "../../common-markdown/html2md"

export const getWechatArticleUrlFromShortId = (shortId: string) =>
  `https://mp.weixin.qq.com/s/${shortId}`

export const parseWxmpArticleShortId = (url: string) =>
  /mp.weixin.qq.com\/s\/(.*?)$/.exec(url)?.[1]

export const parseWxmpArticleLongId = (url: string) =>
  /mp.weixin.qq.com.*?sn=(.*?)&/.exec(url)?.[1]

/**
 * url-short: https://mp.weixin.qq.com/s/T2DpRlMxTSwYIPJm1ZYU6w
 * url-long: http://mp.weixin.qq.com/s?__biz=MjM5MjAyNDUyMA==&amp;mid=2650991323&amp;idx=1&amp;sn=35606561be8182e2dcf373bb22b3f42a&amp;chksm=bd5ad87c8a2d516ab07ad987b2678650e65c01ed5b7908e20d24a36e51263b9f20eb3f822ae8#rd
 * @param url
 */
export const ensureWxmpArticleLongId = async (url: string) => {
  let longId = parseWxmpArticleLongId(url)
  if (!longId) {
    const { data: pageText } = await api.get<string>(url)
    const html = parse(pageText)
    const newUrl = parseMetaFromHtml(html, "og:url", "property")
    if (newUrl) longId = parseWxmpArticleLongId(newUrl)
  }
  if (!longId) throw new Error(`failed to parse longId from url: ${url}`)
  return longId
}

export const fetchWechatArticle = async (
  url: string,
  withSummary?: boolean,
  engine?: FetchEngine,
) => {
  if (engine === "nodejs") {
    // 1. fetch page
    const { data: pageText } = await api.get<string>(url)

    // 2. parse page
    const html = parse(pageText)
    const ogUrl = parseMetaFromHtml(html, "og:url", "property")
    const title = parseMetaFromHtml(html, "og:title")
    const coverUrl = parseMetaFromHtml(html, "og:image")!
    // const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
    // const authorPublisherName = parseMetaFromHtml(html, "author", "name")

    // const authorPublisher: IUserSummary = {
    //   name: authorPublisherName,
    //   image: null, // author 有可能没有头像，比如里帮助
    //   id: "",
    // }
    const authorAccount: IUserSummary = {
      name: /var nickname = htmlDecode\("(.*?)"\);/.exec(pageText)?.[1] ?? null,
      image: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1] ?? null,
      id: /var user_name = "(.*?)"/.exec(pageText)?.[1] ?? "",
    }

    // 去除作者信息，否则会有干扰, case-id: fq-Bb_v
    html.getElementById("meta_content")?.remove()

    const contentMd = html2md(
      html.getElementById("img-content")?.innerHTML ?? "",
    )

    console.log({ ogUrl })

    if (withSummary) {
    }

    return {
      platformId: /sn=(.*?)&/.exec(ogUrl ?? "")![1]!, // get id(sn) from page
      // 微信公众号使用主体名，而非原创作者名
      author: authorAccount,
      time:
        new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null, // 1711455495
      title,
      cover: { url: coverUrl },
      contentMd,
    }
  }

  const { data } = await api.get(
    `${env.NEXT_PUBLIC_BACKEND_URL}/spider/parse-url`,
    {
      params: {
        url,
        with_summary: withSummary,
      },
    },
  )
  return data
}
