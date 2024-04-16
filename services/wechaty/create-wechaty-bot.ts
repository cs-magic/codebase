import { logEnv } from "@cs-magic/common/utils/log-env"
import config from "@cs-magic/p01-card/config.json"

import dotenv from "dotenv"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { Path } from "../../packages/common-path"
import { MessageQueue } from "./handle-messages/message-queue"
import { getBotWxid } from "./utils/bot-wxid"

dotenv.config({ path: Path.envFile, override: true })
logEnv("wechaty")

export const createWechatyBot = ({ name }: { name?: string }) => {
  console.log("-- init bot: ", { name })

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  const mq = new MessageQueue(bot, 10)

  bot
    .on("error", async (err) => {
      // prettyError(err)
    })
    .on("scan", (value, status) => {
      console.log(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      console.log(`-- User logged in: `, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = {
        version: config.version,
        startTime: Date.now(),
      }
    })
    .on("message", async (message) => {
      await mq.enqueueMessage(message)
    })
  // .start()

  return bot
}
