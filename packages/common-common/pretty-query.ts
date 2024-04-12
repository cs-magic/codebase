/**
 * 可用于微信的回复
 *
 * @param title
 * @param contents
 */
export const prettyQuery = (
  title: string,
  contents: string[],
  options?: { footer: string },
) => {
  const lines = [
    "+----------------------------",
    "  " + title,
    "------------------------------",
    contents
      .map((s) =>
        // yaml 的结尾会加\n，要去掉
        s.trim(),
      )
      .join(`\n------------------------------`),
  ]

  if (options?.footer) {
    lines.push("------------------------------", "  " + options.footer)
  }

  lines.push("+----------------------------+")

  console.log({ contents, lines })

  return lines.join("\n")
}
