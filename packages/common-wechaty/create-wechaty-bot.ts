import { config } from "@/config/system"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { prettyError } from "../common-common/pretty-error"
import { sleep } from "../common-datetime/utils"
import { IBotStaticContext } from "./schema"
import { getBotContextFromMessage } from "./utils/bot-context"
import { getHandlers } from "./utils/get-handlers"
import { prettyBotQuery } from "./utils/pretty-bot-query"

export const botStaticContext: IBotStaticContext = {
  version: config.version,
  startTime: Date.now(),
}

export const createWechatyBot = ({ name }: { name?: string }) => {
  console.log("-- create bot: ", { name })

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会加上各种其他函数

  bot
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`User logged in: `, user.payload)

      // update bot wxid
      const botWxid = user.payload?.id
      if (!botWxid)
        throw new Error(
          `no wxid from user payload: ${JSON.stringify(user.payload)}`,
        )

      bot.staticContext = botStaticContext
      bot.wxid = botWxid
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

      await sleep(3e3)
    })
  // .start()

  return bot
}
