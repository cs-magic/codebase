import { LangType } from "@/schema/wechat-user"
import { z } from "zod"
import { prettyQuery } from "../../common-common/pretty-query"
import { botStaticContext } from "../create-wechaty-bot"
import { messageHandlerSchema } from "../message-handlers/validator"
import { loadBotDynamicContext } from "./bot-context"

export const prettyBotQuery = async (
  title: string,
  content: string,
  type: LangType,
  tips: (keyof z.infer<typeof messageHandlerSchema>)[],
) => {
  const context = await loadBotDynamicContext(type)
  return prettyQuery(title, content, {
    footer: `${context.name} ${botStaticContext.version}`,
    tips: tips ? tips.join("\n") : undefined,
  })
}
