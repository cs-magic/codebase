import { SEPARATOR_BOX, SEPARATOR_LINE } from "../const"

/**
 * 可用于微信的回复
 *
 */
export const formatQuery = (
  content: string,
  options?: { title?: string; footer?: string; tips?: string },
) => {
  const lines = []

  if (options?.title) lines.push("  " + options.title)

  lines.push(content)

  if (options?.tips) {
    lines.push("TIPS: ", options.tips)
  }

  if (options?.footer) {
    lines.push("  " + options.footer)
  }

  let s = lines.join(`\n${SEPARATOR_LINE}\n`)

  if (options) {
    s = [SEPARATOR_BOX, s, SEPARATOR_BOX].join("\n")
  }
  return s
}
