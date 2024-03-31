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

  return {
    title: /<title>(.*?)<\/title>/ms.exec(content)?.[1],
    description: /<description>(.*?)<\/description>/ms.exec(content)?.[1],
    mindmap: /<mindmap>(.*?)<\/mindmap>/ms.exec(content)?.[1],
    comment: /<comment>(.*?)<\/comment>/ms.exec(content)?.[1],
    tags: /<tags>(.*?)<\/tags>/ms.exec(content)?.[1]?.split(","),
  }
}
