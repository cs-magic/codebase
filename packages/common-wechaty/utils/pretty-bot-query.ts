import { prettyQuery } from "../../common-common/pretty-query"
import { CommandType } from "../message-handlers/_all"
import { IBotContext } from "../schema"

export const prettyBotQuery = async (
  context: IBotContext,
  title: string,
  content: string,
  tips?: CommandType[],
) => {
  return prettyQuery(title, content, {
    footer: `${context.name} ${context.version}`,
    tips: tips ? tips.map((t) => `/${t}`).join("\n") : undefined,
  })
}
