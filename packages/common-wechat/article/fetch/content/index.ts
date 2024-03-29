import parse from "node-html-parser"
import { api } from "../../../../common-api"
import { html2md } from "../../../../common-markdown/html2md"

export const fetchWechatArticleContent = async (url: string) => {
  const { data: page } = await api.get<string>(url)
  console.log("-- fetchWechatArticlePage: ", page)

  const content = parseContentFromWechatArticlePage(page, "md")
  console.log("-- content: ", content)

  return content
}

export const parseContentFromWechatArticlePage = (
  page: string,
  outputType: "html" | "md" = "md",
) => {
  const html = parse(page)
  const content = html.getElementById("js_content")?.innerHTML

  if (content === undefined) throw new Error("not found content")

  if (outputType === "md") return html2md(content)

  return content
}
