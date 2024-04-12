export const SEPARATOR = `------------------------------`
export const QUERY_SEPARATOR_2 =
  "+" + SEPARATOR.slice(0, SEPARATOR.length - 2) + "+"

/**
 * 可用于微信的回复
 *
 * @param title
 * @param content
 */
export const prettyQuery = (
  title: string,
  content: string,
  options?: { footer?: string; tips?: string },
) => {
  const lines = [QUERY_SEPARATOR_2, "  " + title, SEPARATOR, content]

  if (options?.tips) {
    lines.push(SEPARATOR, "TIPS: ", options.tips)
  }

  if (options?.footer) {
    lines.push(SEPARATOR, "  " + options.footer)
  }

  lines.push(QUERY_SEPARATOR_2)

  // console.log({ contents, lines })

  return lines.join("\n")
}
