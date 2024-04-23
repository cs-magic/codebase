import { logger } from "@cs-magic/log/logger"
import dotenv from "dotenv"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { getEnv } from "../../packages-to-classify/env"
import { logEnv } from "../../packages-to-classify/env/utils/log-env"
import { Path } from "../../packages-to-classify/path"
import { handleMessage } from "./handle-messages/handle-message"
import { SenderQueue } from "./handle-messages/sender-queue"
import { initBotStaticContext } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"

// load wechaty-puppet env
dotenv.config({ path: Path.envFile })
getEnv()
logEnv("wechaty")

export const createWechatyBot = ({ name }: { name?: string }) => {
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

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
      logger.info(`-- User logged in: %o`, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = initBotStaticContext()

      bot.sendQueue = new SenderQueue(10)
    })
    .on("message", async (message) => {
      await handleMessage(bot, message)
    })
  // .start()

  return bot
}
