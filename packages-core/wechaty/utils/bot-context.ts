import { type Message, type Wechaty } from "wechaty"
import packageJson from "../../../package.json"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import { type IBotContext, type IBotStaticContext } from "../schema/bot"
import { getBotTemplate } from "./bot-template"

export const getBotStaticContext = async (
  bot: Wechaty,
): Promise<IBotStaticContext> => bot.staticContext

export const getBotContext = async (
  bot: Wechaty,
  message: Message,
): Promise<IBotContext> => {
  const staticContext = await getBotStaticContext(bot)
  const dynamicContext = await getBotTemplate(message, staticContext)

  return {
    ...staticContext,
    ...dynamicContext,
  }
}

export const initBotStaticContext = async (): Promise<IBotStaticContext> => ({
  version: packageJson.version,
  startTime: Date.now(),
  jobs: [], // todo: await prisma.task.findMany({where: {timer: {}}})
})
