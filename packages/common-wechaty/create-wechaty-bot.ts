import { config } from "@/config/system"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { prettyError } from "../common-common/pretty-error"
import { getBotContextFromMessage } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"
import { getHandlers } from "./utils/get-handlers"
import { prettyBotQuery } from "./utils/pretty-bot-query"

export const createWechatyBot = ({ name }: { name?: string }) => {
  console.log("-- init bot: ", { name })

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  bot
    .on("error", async (err) => {
      console.error("-- error")
      console.error(err)
    })
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = {
        version: config.version,
        startTime: Date.now(),
      }
    })
    .on("message", async (message) => {
      try {
        for (const handler of getHandlers(bot)) {
          await handler.onMessage(message)
        }
      } catch (e) {
        let s = prettyError(e)
        // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
        // from wang, 2024-04-13 01:36:14
        if (s.includes("filterValue not found for filterKey: id")) {
          s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`
        }
        const context = await getBotContextFromMessage(bot, message)
        await message.say(await prettyBotQuery(context, "哎呀出错啦", s))
      }
    })
  // .start()

  return bot
}
