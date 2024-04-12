export const QUERY_SEPARATOR = `------------------------------`
export const QUERY_SEPARATOR_2 =
  "+" + QUERY_SEPARATOR.slice(0, QUERY_SEPARATOR.length - 2) + "+"

/**
 * 可用于微信的回复
 *
 * @param title
 * @param content
 */
export const prettyQuery = (
  title: string,
  content: string,
  options?: { footer: string },
) => {
  const lines = [QUERY_SEPARATOR_2, "  " + title, QUERY_SEPARATOR, content]

  if (options?.footer) {
    lines.push(QUERY_SEPARATOR, "  " + options.footer)
  }

  lines.push(QUERY_SEPARATOR_2)

  // console.log({ contents, lines })

  return lines.join("\n")
}
