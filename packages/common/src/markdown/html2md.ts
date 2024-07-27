import { NodeHtmlMarkdown } from "node-html-markdown"

/**
 * ref:
 *   npm:
 *   - https://www.npmjs.com/package/turndown （支持扩展）
 *   - https://www.npmjs.com/package/html-to-md （貌似不支持扩展，比如不支持自定义图片解析，就很麻烦）
 *
 * @param html
 * @param type
 */
export const html2md = (
  html: string,
  type: "node-html-markdown" | "turndown" = "node-html-markdown",
) => {
  switch (type) {
    case "turndown":
      throw new Error(
        "尽管turndown star最多，而且支持plugin扩展，但是build有bug，以及ts支持很差，不要用它",
      )

    case "node-html-markdown":
      return NodeHtmlMarkdown.translate(html)
      return html
  }
}
