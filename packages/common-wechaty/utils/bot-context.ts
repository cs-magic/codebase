import { LangType } from "@/schema/wechat-user"
import { IBotDynamicContext } from "../schema"

export const loadBotDynamicContext = async (
  lang: LangType,
): Promise<IBotDynamicContext> => {
  const data = (await import(`../config/bot.${lang}.json`)) as {
    name: string
  }
  return {
    ...data,
  }
}
