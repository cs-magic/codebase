import { IUserSummary } from "@/schema/user.summary"
import parse from "node-html-parser"
import { api } from "../../common-api"
import { parseMetaFromHtml } from "../../common-html/utils"
import { html2md } from "../../common-markdown/html2md"

export const parseWechatArticle = async (sourceUrl: string) => {
  // 1. fetch page
  const { data: pageText } = await api.get<string>(sourceUrl)

  // 2. parse page
  const html = parse(pageText)
  const ogUrl = parseMetaFromHtml(html, "og:url", "property")
  const title = parseMetaFromHtml(html, "og:title")
  const coverUrl = parseMetaFromHtml(html, "og:image")!
  const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  const authorPublisherName = parseMetaFromHtml(html, "author", "name")

  const authorPublisher: IUserSummary = {
    name: authorPublisherName,
    image: null, // author 有可能没有头像，比如里帮助
    id: "",
  }
  const authorAccount: IUserSummary = {
    name: /var nickname = htmlDecode\("(.*?)"\);/.exec(pageText)?.[1] ?? null,
    image: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1] ?? null,
    id: /var user_name = "(.*?)"/.exec(pageText)?.[1] ?? "",
  }

  // 去除作者信息，否则会有干扰, case-id: fq-Bb_v
  html.getElementById("meta_content")?.remove()

  return {
    platformId: /sn=(.*?)&/.exec(ogUrl ?? "")![1]!, // get id(sn) from page
    // 微信公众号使用主体名，而非原创作者名
    author: authorAccount,
    time:
      new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null, // 1711455495
    title,
    cover: { url: coverUrl },
    contentMd: html2md(html.getElementById("page-content")?.innerHTML ?? ""),
  }
}

export const parseUrlFromWechatUrlMessage = (text: string): string | null => {
  const m = /<url>(.*?)<\/url>/.exec(text)
  return m?.[1] ?? null
}
