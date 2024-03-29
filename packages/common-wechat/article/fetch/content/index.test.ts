import { promises } from "fs"
import parse from "node-html-parser"
import path from "path"
import { fileURLToPath } from "url"
import { html2md } from "../../../../common-markdown/utils"
import { wechatArticleUrlSample } from "../config"
import { fetchWechatContent } from "./index"

describe("fetch wechat article", () => {
  const dirname = path.resolve(fileURLToPath(import.meta.url), "../__generated")

  beforeAll(async () => {
    await promises.mkdir(dirname, { recursive: true })
  })

  it("fetch content", async () => {
    const page = await fetchWechatContent(wechatArticleUrlSample)
    await promises.writeFile(path.join(dirname, "page.html"), page)

    const html = parse(page)
    const contentHtml = html.getElementById("js_content")?.innerHTML
    if (contentHtml) {
      await promises.writeFile(path.join(dirname, "content.html"), contentHtml)
    }
  })

  it("html2md", async () => {
    const content = await promises.readFile(
      path.join(dirname, "content.html"),
      { encoding: "utf-8" },
    )

    const approaches = ["turndown", "node-html-markdown"] as const
    await Promise.all(
      approaches.map(async (approach) => {
        await promises.writeFile(
          path.join(dirname, `content.${approach}.md`),
          html2md(content, approach),
        )
      }),
    )
  })
})
