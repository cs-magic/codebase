import { formatQuery } from "@cs-magic/common/utils/format-query"
import { type IBotContext } from "../schema/bot"
import { CommandType } from "../schema/commands"

export const formatBotQuery = async (
  context: IBotContext,
  title: string,
  content: string,
  tips?: CommandType[],
) => {
  return formatQuery(title, content, {
    footer: `${context.name} ${context.version}`,
    tips: tips ? tips.map((t) => `/${t}`).join("\n") : undefined,
  })
}
