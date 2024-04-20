import { logger } from "@cs-magic/log/logger"
import dotenv from "dotenv"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { PuppetPadlocal } from "@cs-magic/wechaty-puppet-padlocal"
import { getEnv } from "../../common/env"
import { Path } from "../../common/path"
import { handleMessage } from "./handle-messages/handle-message"
import { SenderQueue } from "./handle-messages/sender-queue"
import { initBotStaticContext } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"

dotenv.config({ path: Path.envFile })
// logEnv("wechaty")

const env = getEnv()

export const createWechatyBot = ({ name }: { name?: string }) => {
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
    puppet: new PuppetPadlocal({
      token: env.WECHATY_PUPPET_PADLOCAL_TOKEN,
    }),
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
