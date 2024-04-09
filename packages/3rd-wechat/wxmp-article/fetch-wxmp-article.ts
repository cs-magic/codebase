import { env } from "@/env"
import { ICardGenOptions } from "@/schema/card"
import { IUserBasic } from "@/schema/user.summary"
import { parse } from "node-html-parser"
import { api, backendApi } from "../../common-api"
import { parseMetaFromHtml } from "../../common-html/utils"
import { callAgent } from "../../common-llm/agents/call-agent"
import { html2md } from "../../common-markdown/html2md"
import { IFetchWxmpArticleRes } from "../schema"

export const fetchWxmpArticle = async (
  url: string,
  options?: ICardGenOptions,
): Promise<IFetchWxmpArticleRes> => {
  if (options?.backendEngineType === "nodejs") {
    // 1. fetch page
    const { data: pageText } = await api.get<string>(url)

    // 2. parse page
    const html = parse(pageText)
    const ogUrl = parseMetaFromHtml(html, "og:url", "property")
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

    const contentMd = html2md(
      html.getElementById("img-content")?.innerHTML ?? "",
    )

    console.log("-- parsed url: ", ogUrl)
    let contentSummary: string | null | undefined = undefined
    if (options.summaryModel) {
      contentSummary = await callAgent({
        input: contentMd,
        agentType: "summarize-content",
        model: options.summaryModel,
      })
    }

    return {
      sourceUrl: url,
      platformId: /sn=(.*?)&/.exec(ogUrl ?? "")![1]!, // get id(sn) from page
      platformType: "wxmpArticle",
      // 微信公众号使用主体名，而非原创作者名
      author: authorAccount,
      time:
        new Date(Number(/var ct = "(.*?)"/.exec(pageText)?.[1]) * 1e3) ?? null, // 1711455495
      title,
      description,
      cover: { url: coverUrl, width: null, height: null },
      // contentMd,
      contentSummary,
    }
  }

  const { data } = await backendApi.get(
    `${env.NEXT_PUBLIC_BACKEND_URL}/spider/parse-url`,
    {
      params: {
        url,
        summary_model: options?.summaryModel,
        md_with_img: options?.mdWithImg,
      },
    },
  )
  data.time = new Date((data as { time: string }).time)
  return data
}
