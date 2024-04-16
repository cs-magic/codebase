import { formatQuery } from "@cs-magic/common/utils/format-query"
import { type IBotContext } from "../schema/bot"

export const formatBotQuery = async (
  context: IBotContext,
  title: string,
  content: string,
  tips?: string[],
) => {
  return formatQuery(title, content, {
    footer: `${context.name} ${context.version}`,
    tips: tips ? tips.map((t) => `  ${t}`).join("\n") : undefined,
  })
}
