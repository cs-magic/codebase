import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { prettyError } from "../common-common/pretty-error"
import { prettyQuery } from "../common-common/pretty-query"
import { sleep } from "../common-datetime/utils"
import { MessageHandlerMap } from "./message-handlers/_all"
import { IBotContext } from "./schema"
import { initBotContext } from "./utils/bot-context"
import { dumpBotPreference } from "./utils/bot-preference"
import { renderBotTemplate } from "./utils/bot-template"

export const createWechatyBot = async ({ name }: { name?: string }) => {
  console.log("-- create bot: ", { name })
  const context = await initBotContext()

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会加上各种其他函数

  bot.context = context

  bot.prettyQuery = (title: string, content: string, tips?: string) => {
    if (!context) return prettyQuery("系统错误", "Missing Context")

    return prettyQuery(title, content, {
      footer: `${context.name} ${context.version}`,
      tips,
    })
  }

  bot.template = (context?: Partial<IBotContext>) => {
    return renderBotTemplate({ ...bot.context, ...context })
  }

  process.on("SIGINT", () => {
    void dumpBotPreference(bot.context.preference)
  })

  console.log("-- registering handlers")
  const handlers = bot.context.preference.handlers.map((handlerName) => {
    console.log(`-- registering handler(name=${handlerName})`)
    const h = new MessageHandlerMap[
      handlerName as keyof typeof MessageHandlerMap
    ](handlerName, bot)
    return h
  })

  await bot
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user.payload)
    })
    .on("message", async (message) => {
      console.log("<< message: ", {
        message: message.payload,
        talker: message.talker().payload,
        listener: message.listener()?.payload,
        room: message.room()?.payload,
      })

      try {
        for (const handler of handlers) {
          await handler.onMessage(message)
        }
      } catch (e) {
        const s = prettyError(e)
        await message.say(bot.prettyQuery("哎呀出错啦", `原因： ${s}`))
      }

      await sleep(3e3)
    })
    .start()

  return bot
}
