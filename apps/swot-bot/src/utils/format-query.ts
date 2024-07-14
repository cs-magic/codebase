import { SEPARATOR_BOX, SEPARATOR_LINE } from "@cs-magic/common"
import { CommandStyle } from "@cs-magic/swot-bot-core"

/**
 * 可用于微信的回复
 *
 */
export const formatQuery = (
  content: string,
  options?: {
    title?: string
    footer?: string
    tips?: string
    commandStyle?: CommandStyle
  },
) => {
  const lines = []

  if (options?.commandStyle === CommandStyle.standard && options?.title)
    lines.push("  " + options.title)

  lines.push(content)

  if (options?.tips) lines.push(["TIPS: ", options.tips].join("\n"))

  if (options?.commandStyle === CommandStyle.standard && options?.footer)
    lines.push("  " + options.footer)

  let s = lines.join(`\n${SEPARATOR_LINE}\n`)

  if (options?.commandStyle === CommandStyle.standard)
    s = [SEPARATOR_BOX, s, SEPARATOR_BOX].join("\n")

  return s
}
