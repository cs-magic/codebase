import { prettyQuery } from "../common-common/pretty-query"
import { loadBotContext } from "./schema"

export const prettyBotQuery = async (title: string, contents: string[]) => {
  const botContext = await loadBotContext()

  return prettyQuery(title, contents, {
    footer: `${botContext.name} ${botContext.version}`,
  })
}
