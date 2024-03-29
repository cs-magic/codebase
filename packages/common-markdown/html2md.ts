import { NodeHtmlMarkdown } from "node-html-markdown"
import TurndownService from "turndown"
// @ts-ignore
import { gfm } from "turndown-plugin-gfm"
import { z } from "zod"

/**
 * ref:
 *   npm packages:
 *   - https://www.npmjs.com/package/turndown （支持扩展）
 *   - https://www.npmjs.com/package/html-to-md （貌似不支持扩展，比如不支持自定义图片解析，就很麻烦）
 *
 * @param html
 * @param type
 */
export const html2md = (
  html: string,
  type: "turndown" | "node-html-markdown" = "turndown",
) => {
  switch (type) {
    case "turndown":
      return (
        new TurndownService()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          .use(gfm)
          // ref: https://github.com/mixmark-io/turndown/issues/305#issuecomment-1202304816
          // e.g. 微信文章内的：
          .addRule("img", {
            filter: "img",
            replacement: function (content, node, options) {
              if (!("getAttribute" in node)) return "![]()"

              const src =
                node.getAttribute("src") ?? node.getAttribute("data-src") ?? ""
              return "![](" + src + ")"
            },
          })
          .turndown(html)
      )

    case "node-html-markdown":
      return NodeHtmlMarkdown.translate(html)
  }
}
