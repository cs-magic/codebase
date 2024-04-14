import { truncateString } from "../../packages/common-algo/string"

/**
 * @deprecated
 * 这个函数不需要了，因为我们可以使用 wrap 的技术
 * @param input
 */
export const transformMindmapContent = (input?: string): string => {
  const output = (input ?? "")
    .split(/\\n/g)
    .map((s) => {
      return truncateString(s, 30)
    })
    .join("\n")

  console.log(
    `-- transformed mindmap content: input=${input}, output=${output}`,
  )
  return output
}
