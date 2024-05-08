import { withError } from "@cs-magic/common/utils/with-error"
import { parseWxmpArticleUrl } from "@cs-magic/p01-card/src/utils/card-platform/wechat-article/utils"
// todo: avoid import from project
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { Prisma } from "@prisma/client"
import { parse } from "node-html-parser"
import { z } from "zod"
import { api } from "../../../../../../packages-to-classify/api-client/api"
import { parseMetaFromHtml } from "../../../../../../packages-to-classify/html/utils"
import { BackendType } from "@cs-magic/llm/schema/llm.base"
import { html2md } from "../../../../../../packages-to-classify/markdown/html2md"
import { WxmpArticleSimulator } from "../../../../../../packages-to-classify/spider/wxmp-article-simulator"

const wxmpArticleSimulator = new WxmpArticleSimulator()

export type RequestApproachType = "api" | "simulate"
export type RequestOptions = {
  backendType?: BackendType
  approach?: {
    type?: RequestApproachType
    headless?: boolean
  }
}

export const requestPage = async (
  url: string,
  options?: RequestOptions,
): Promise<Prisma.CardUncheckedCreateInput> => {
  // !important: 不加这个会导致环境异常: <h2 class=\"weui-msg__title\">环境异常</h2>\n        <p class=\"weui-msg__desc\">当前环境异常，完成验证后即可继续访问。</p>
  url = url.replace(/amp;/g, "")

  // 1. fetch page
  let pageText: string
  if (options?.approach?.type === "simulate") {
    // simulate 也非万能，在服务端出现了 navigate 无法抵达 networkidle 的问题
    wxmpArticleSimulator.launchOptions.headless = options?.approach?.headless
    pageText = await wxmpArticleSimulator.crawl(url)
  } else {
    pageText = (await api.get<string>(url)).data
  }
  // console.debug(pageText)

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

  const d = new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) // 1711455495
  const time = await withError("should time is a Date")(z.date().parseAsync(d))
  // logger.info(JSON.stringify({ time }))

  const title = await withError("should title is valid")(
    z.string().min(1).parseAsync(parseMetaFromHtml(html, "og:title")),
  )
  const coverUrl = await withError("should cover is valid")(
    z.string().min(1).parseAsync(parseMetaFromHtml(html, "og:image")!),
  )
  const description = await withError("should desc is valid")(
    z
      .string()
      .parseAsync(parseMetaFromHtml(html, "og:description", "property")),
  )
  // logger.info(JSON.stringify({ title }))
  // const source = parseMetaFromHtml(html, "og:site_name") // 微信公众平台
  // const authorPublisherName = parseMetaFromHtml(html, "author", "name")

  // const authorPublisher: IUserSummary = {
  //   name: authorPublisherName,
  //   image: null, // author 有可能没有头像，比如里帮助
  //   id: "",
  // }
  const authorAccount: IUserSummary = {
    name: await z
      .string()
      .min(1)
      .parseAsync(/var nickname = htmlDecode\("(.*?)"\);/.exec(pageText)?.[1]),
    image: await z
      .string()
      .min(1)
      .parseAsync(/var hd_head_img = "(.*?)"/.exec(pageText)?.[1]),
    id: await z
      .string()
      .min(1)
      .parseAsync(/var user_name = "(.*?)"/.exec(pageText)?.[1]),
  }
  // logger.info({ authorAccount })

  // 去除作者信息，否则会有干扰, case-id: fq-Bb_v
  html.getElementById("meta_content")?.remove()
  const contentHtml = await z
    .string()
    .min(1)
    .parseAsync(html.getElementById("img-content")?.innerHTML)

  const contentMd = html2md(contentHtml)

  return {
    sourceUrl: url,
    platformType: "wxmpArticle",
    ...urlParsed,
    // 微信公众号使用主体名，而非原创作者名
    author: authorAccount,
    time,
    title,
    description,
    cover: { url: coverUrl, width: null, height: null },
    html: contentHtml,
    contentMd,
  }
}
