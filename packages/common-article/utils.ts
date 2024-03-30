import { IArticleSummary } from "./schema"

/**
 *  regex of `/ms`: ref:  https://stackoverflow.com/a/66001191/9422455
 * @param summary
 */
export const parseSummary = (
  summary: IArticleSummary | null,
): IArticleSummary | null => {
  console.log("-- parseSummary: ", summary)
  if (!summary?.response) return null
  const { response } = summary

  return {
    response,
    title: /<title>(.*?)<\/title>/ms.exec(response)?.[1],
    description: /<description>(.*?)<\/description>/ms.exec(response)?.[1],
    mindmap: /<mindmap>(.*?)<\/mindmap>/ms.exec(response)?.[1],
    comment: /<comment>(.*?)<\/comment>/ms.exec(response)?.[1],
  }
}
