import { SEPARATOR_LINE, SEPARATOR_BOX } from "../const"

/**
 * 可用于微信的回复
 *
 * @param title
 * @param content
 */
export const formatQuery = (
  title: string,
  content: string,
  options?: { footer?: string; tips?: string },
) => {
  const lines = [SEPARATOR_BOX, "  " + title, SEPARATOR_LINE, content]

  if (options?.tips) {
    lines.push(SEPARATOR_LINE, "TIPS: ", options.tips)
  }

  if (options?.footer) {
    lines.push(SEPARATOR_LINE, "  " + options.footer)
  }

  lines.push(SEPARATOR_BOX)

  // console.log({ contents, lines })

  return lines.join("\n")
}
