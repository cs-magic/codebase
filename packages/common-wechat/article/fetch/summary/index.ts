import { Prisma } from "@prisma/client"
import parse from "node-html-parser"
import OpenAI from "openai"
import { api } from "../../../../common-api"
import { html2md } from "../../../../common-markdown/html2md"
import {
  IFetchWechatArticleSummaryConfig,
  IWechatArticleSummary,
} from "./schema"
import ChatCompletion = OpenAI.ChatCompletion

export const fetchWechatArticleSummary = async (
  id: string,
  summaryConfig?: IFetchWechatArticleSummaryConfig,
): Promise<IWechatArticleSummary> => {
  const { data: page } = await api.get<string>(
    `https://mp.weixin.qq.com/s/${id}`,
  )
  // console.log("-- fetchWechatArticlePage: ", page)

  const html = parse(page)
  const contentHtml =
    html.getElementById("js_content")?.getAttribute("content") ?? null

  const title = html.getElementById("og:title")?.innerHTML ?? null
  const coverUrl =
    html.getElementById("og:image")?.getAttribute("content") ?? null

  let contentMd: string | null | undefined = undefined
  let contentSummary: string | null | undefined = undefined

  if (contentHtml) {
    contentMd = html2md(contentHtml)

    if (summaryConfig?.get) {
      contentSummary = await summaryConfig.get(id)
      if (contentSummary) console.log("-- summary cached")
    }

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
    contentHtml,
    contentMd,
    contentSummary,
  }
}
