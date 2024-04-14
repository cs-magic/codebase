import { prettyQuery } from "../../common-common/pretty-query"
import { LangType } from "../../common-i18n/schema"
import { botStaticContext } from "../create-wechaty-bot"
import { CommandType } from "../message-handlers/_all"
import { getBotDynamicContext } from "./bot-context"

export const prettyBotQuery = async (
  title: string,
  content: string,
  tips?: CommandType[],
  type?: LangType,
) => {
  const context = await getBotDynamicContext(type ?? "en")
  return prettyQuery(title, content, {
    footer: `${context.name} ${botStaticContext.version}`,
    tips: tips ? tips.map((t) => `/${t}`).join("\n") : undefined,
  })
}
