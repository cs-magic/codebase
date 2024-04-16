import { type CommandType } from "../handle-messages/_all"
import { type IBotContext } from "../schema/bot"

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
