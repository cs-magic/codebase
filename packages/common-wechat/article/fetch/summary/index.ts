import parse from "node-html-parser"
import OpenAI from "openai"
import { api } from "../../../../common-api"
import { parseMetaContent } from "../../../../common-html/utils"
import { html2md } from "../../../../common-markdown/html2md"
import { getWechatArticleUrlFromId } from "../../utils"
import {
  IFetchWechatArticleSummaryConfig,
  IWechatArticleSummary,
} from "./schema"
import ChatCompletion = OpenAI.ChatCompletion

export const fetchWechatArticleSummary = async (
  id: string,
  summaryConfig?: IFetchWechatArticleSummaryConfig,
): Promise<IWechatArticleSummary> => {
  const url = getWechatArticleUrlFromId(id)
  const { data: page } = await api.get<string>(url)
  console.log("-- fetchWechatArticleSummary: ", { id, url })

  const html = parse(page)
  const contentHtml = html.getElementById("page-content")?.innerHTML ?? null
  console.log("-- contentHtml isFetched: ", !!contentHtml)

  const title = parseMetaContent(html, "og:title")
  const coverUrl = parseMetaContent(html, "og:image")
  console.log({ title, coverUrl })

  let contentMd: string | null | undefined = undefined
  let contentSummary: string | null | undefined = undefined

  if (contentHtml) {
    contentMd = html2md(contentHtml)

    if (summaryConfig?.get) {
      contentSummary = await summaryConfig.get(id)
      if (contentSummary) console.log("-- summary cached")
    }

    console.log({ contentSummary })
    if (!contentSummary) {
      console.log("-- summary fetching")
      const { data } = await api.postForm<ChatCompletion>(
        "https://openapi.cs-magic.cn/agent/call",
        {
          content: contentHtml,
        },
        {
          params: {
            agent_type: "article-summariser",
            model_type: "moonshot-v1-8k", // 这个效果显著比gpt3.5好，也略胜于gpt4
          },
        },
      )
      contentSummary = data.choices[0]?.message.content
      console.log("-- summary fetched: ", contentSummary)
      if (contentSummary && summaryConfig?.set) {
        console.log("-- summary persisting")
        await summaryConfig.set(id, contentSummary)
      }
    }
  }

  return {
    title,
    cover: coverUrl
      ? {
          url: coverUrl,
          type: "image",
        }
      : null,
    // contentHtml,
    contentMd,
    contentSummary,
  }
}
