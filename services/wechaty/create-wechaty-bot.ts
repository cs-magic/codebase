import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { loadEnv } from "../../packages/common-env/utils/load-env"
import { logEnv } from "../../packages/common-env/utils/log-env"
import { MessageQueue } from "./handle-messages/message-queue"
import { initBotStaticContext } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"

loadEnv()
logEnv("wechaty")

export const createWechatyBot = ({ name }: { name?: string }) => {
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  const mq = new MessageQueue(bot, 10)

  bot
    .on("error", async (err) => {
      // prettyError(err)
    })
    .on("scan", (value, status) => {
      logger.info(
        `Scan the following  QR Code to login: ${status}\n[or from web]: https://wechaty.js.org/qrcode/${encodeURIComponent(value)} `,
      )
      qrcodeTerminal.generate(value, { small: true })
    })
    .on("login", async (user) => {
      logger.info(`-- User logged in: `, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = initBotStaticContext()
    })
    .on("message", async (message) => {
      await mq.enqueueMessage(message)
    })
  // .start()

  return bot
}
