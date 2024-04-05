import { IArticleSummaryParsed } from "./schema"

/**
 *  regex of `/ms`: ref:  https://stackoverflow.com/a/66001191/9422455
 * @param content
 */
export const parseSummary = (
  content?: string | null,
): IArticleSummaryParsed | null => {
  console.log("-- parseSummary: ", content)
  if (!content) return null

  const parse = (key: string) =>
    new RegExp(`<${key}>(.*?)</${key}>`, "ms").exec(content)?.[1]

  return {
    title: parse("title"),
    description: parse("description"),
    mindmap: parse("mindmap"),
    comment: parse("comment"),
    tags: parse("tags")
      ?.split(/[,，]/)
      .map((s) => s.replace(/\s+/g, "")),
  }
}
