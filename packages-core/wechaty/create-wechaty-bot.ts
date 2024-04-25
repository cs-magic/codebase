import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { prisma } from "../../packages-to-classify/db/providers/prisma"
import { logEnv } from "../../packages-to-classify/env/utils/log-env"
import { handleMessage } from "./handle-messages/handle-message"
import { SenderQueue } from "./handle-messages/sender-queue"
import { initBotStaticContext } from "./utils/bot-context"
import { getBotWxid } from "./utils/bot-wxid"
import {
  getRobustData,
  getRobustPreference,
} from "./utils/get-robust-preference"

// load wechaty-puppet env
logEnv("wechaty")

export const createWechatyBot = ({ name }: { name?: string }) => {
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
  }) as Wechaty // 等会再更新其他扩展的信息

  bot
    .on("login", async (user) => {
      logger.info(`-- User logged in: %o`, user.payload)

      bot.wxid = getBotWxid(user)

      bot.staticContext = await initBotStaticContext()

      bot.sendQueue = new SenderQueue(10)
    })
    .on("message", async (message) => {
      await handleMessage(bot, message)
    })
    .on("room-invite", async (room) => {
      logger.info(
        `auto accept invitation into room(id=${room.id}, topic=${await room.topic()})`,
      )
      // todo: notify and decide
      await room.accept()
    })
    .on("room-join", async (room, inviteeList, inviter, date) => {
      const roomNotice = await room.announce()
      logger.info(`invitees: %o`, inviteeList)
      logger.info(`notice: %o`, roomNotice)
      const roomInDB = await prisma.wechatRoom.findUnique({
        where: { id: room.id },
      })
      if (!roomInDB) return

      const preference = getRobustPreference(roomInDB)
      if (!preference.onRoomJoin?.sayAnnounce?.enabled) return

      const data = getRobustData(roomInDB)
      data.roomNewInvitees.push(...inviteeList.map((i) => i.id))
      if (
        data.roomNewInvitees.length >=
        (preference.onRoomJoin?.sayAnnounce?.n ?? 1)
      ) {
        data.roomNewInvitees = []
        // 不能是空字符
        if (roomNotice.trim()) await room.say(roomNotice)
      }
      await prisma.wechatRoom.update({
        where: { id: roomInDB.id },
        data: {
          data: JSON.stringify(data),
        },
      })
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

  // .start()

  return bot
}
