import { parseWxmpArticleUrl } from "@cs-magic/p01-card/src/core/card-platform/wechat-article/utils"
import { ICardGenOptions } from "@cs-magic/p01-card/src/schema/card"
import { parse } from "node-html-parser"
import { api } from "../../common-api-client"
import { parseMetaFromHtml } from "../../common-html/utils"
import { callAgent } from "../../common-llm/call-agent"
import { ICallLLMResponse } from "../../common-llm/schema/llm"
import { html2md } from "../../common-markdown/html2md"
import { IUserBasic } from "@cs-magic/common/schema/user"
import { Prisma } from ".prisma/client"

/**
 * todo: 有概率没拿到文章数据
 * @param url
 * @param options
 */
export const fetchWxmpArticleViaNodejs = async (
  url: string,
  options?: ICardGenOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  // 1. fetch page
  const { data: pageText } = await api.get<string>(url)

  // 2. parse page
  const html = parse(pageText)

  const urlParsed = parseWxmpArticleUrl(url)
  // 额外解析
  if (!urlParsed.platformData.sn) {
    // e.g 1. http://mp.weixin.qq.com/s?__biz=MzAxNTg4NzAxOA==&amp;mid=2247511106&amp;idx=1&amp;sn=fa43c16f05693f6a13d10e8c6aef325f&amp;chksm=9bffd387ac885a9133f51cee60cf6dbd4f89e6c2eeb57710d2f33a3a2a7caecd7fd34a4d1a80#rd
    // e.g 2. http://mp.weixin.qq.com/s?__biz=MzAxNTg4NzAxOA==&mid=2247511106&idx=1&sn=fa43c16f05693f6a13d10e8c6aef325f&chksm=9bffd387ac885a9133f51cee60cf6dbd4f89e6c2eeb57710d2f33a3a2a7caecd7fd34a4d1a80#rd
    const ogUrl = parseMetaFromHtml(html, "og:url", "property")!
    urlParsed.platformData = parseWxmpArticleUrl(ogUrl).platformData
  }

  const title = parseMetaFromHtml(html, "og:title") ?? ""
  const coverUrl = parseMetaFromHtml(html, "og:image")!
  const description = parseMetaFromHtml(html, "og:description", "property")!
  // const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  // const authorPublisherName = parseMetaFromHtml(html, "author", "name")

  // const authorPublisher: IUserSummary = {
  //   name: authorPublisherName,
  //   image: null, // author 有可能没有头像，比如里帮助
  //   id: "",
  // }
  const authorAccount: IUserBasic = {
    name: /var nickname = htmlDecode\("(.*?)"\);/.exec(pageText)?.[1],
    avatar: /var hd_head_img = "(.*?)"/.exec(pageText)?.[1],
    id: /var user_name = "(.*?)"/.exec(pageText)?.[1],
  }

  // 去除作者信息，否则会有干扰, case-id: fq-Bb_v
  html.getElementById("meta_content")?.remove()

  const contentMd = html2md(html.getElementById("img-content")?.innerHTML ?? "")

  let contentSummary: ICallLLMResponse | null = null
  if (options?.summaryModel) {
    contentSummary = await callAgent({
      input: contentMd,
      agentType: "summarize-content",
      model: options.summaryModel,
    })
  }

  return {
    sourceUrl: url,
    platformType: "wxmpArticle",
    ...urlParsed,
    // 微信公众号使用主体名，而非原创作者名
    author: authorAccount,
    time:
      new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null, // 1711455495
    title,
    description,
    cover: { url: coverUrl, width: null, height: null },
    contentMd,
    contentSummary,
  }
}
