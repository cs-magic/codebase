import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { logEnv } from "../../packages-to-classify/env/utils/log-env"
import { handleMessage } from "./handle-messages/handle-message"
import { SenderQueue } from "./handle-messages/sender-queue"
import { initBotStaticContext } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"

// load wechaty-puppet env
logEnv("wechaty")

export const createWechatyBot = ({ name }: { name?: string }) => {
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  let newInviteesCount = 0
  const targetInviteesCount = 1
  bot
    .on("room-join", async (room, inviteeList, inviter, date) => {
      const roomTopic = await room.topic()
      const isTargetRoom = /test|机器猫/.test(roomTopic)
      const roomNotice = await room.announce()
      logger.info(`invitees: %o`, inviteeList)
      logger.info(`notice: %o`, roomNotice)
      if (isTargetRoom) {
        newInviteesCount += inviteeList.length
        if (newInviteesCount >= targetInviteesCount) {
          newInviteesCount = 0
          // 不能是空字符
          if (roomNotice.trim()) {
            await room.say(roomNotice)
          }
        }
      }
    })
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
