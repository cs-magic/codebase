import { ISummaryParsed } from "@/schema/card"

/**
 *  regex of `/ms`: ref:  https://stackoverflow.com/a/66001191/9422455
 * @param input
 */
export const parseSummary = (input?: string): ISummaryParsed => {
  console.log("-- parsed summary input: \n", input)
  const parse = (key: string) =>
    new RegExp(`<${key}>(.*?)</${key}>`, "ms").exec(input ?? "")?.[1]

  const output = {
    title: parse("title"),
    description: parse("description"),
    mindmap: parse("mindmap"),
    comment: parse("comment"),
    tags: parse("tags")
      ?.split(/[,，]/)
      .map((s) => s.replace(/\s+/g, "")),
    model: parse("model"),
  }

  console.log("-- parsed summary output: ", JSON.stringify(output))
  return output
}
