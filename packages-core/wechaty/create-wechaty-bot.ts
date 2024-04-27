import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { ScanStatus, type Wechaty, WechatyBuilder } from "wechaty"
import { logEnv } from "../../packages-to-classify/env/utils/log-env"
import { handleMessage } from "./handlers/handle-message"
import { handleRoomInvite } from "./handlers/handle-room-invite"
import { handleRoomJoin } from "./handlers/handle-room-join"
import { initBotContext } from "./schema/bot.context"

/**
 * 这是一个 wrapper， 请在其他地方 start
 *
 * todo: 当 bot 被拉到一个群的时候，自动触发一句说明
 *
 * @param name
 */
export const createWechatyBot = ({ name }: { name?: string }) => {
  // log env to ensure puppet info.
  logEnv("wechaty")

  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
    puppetOptions: {
      // I added in padlocal, 2024-04-27 08:49:22
      restartOnFailure: false,
    },
  }) as Wechaty // 等会再更新其他扩展的信息

  bot
    //////////////////////////////
    // basic
    //////////////////////////////

    .on("scan", async (qrcode, status, data) => {
      logger.info(
        `onScan (status=${ScanStatus[status]}, data=${data}), scan the following qrcode or from wechaty official: https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`,
      )
      qrcodeTerminal.generate(qrcode, { small: true })
    })

    .on("login", async (user) => {
      logger.info(`onLogin: %o`, user.payload)
      bot.context = await initBotContext(bot)
    })

    .on("logout", (user, reason) => {
      logger.info(`-- User logged out: %o, reason: ${reason}`, user.payload)
    })

    .on("error", async (err) => {
      formatError(err)
    })

    //////////////////////////////
    // social init
    //////////////////////////////

    .on("friendship", (friendship) => {
      logger.info(`onFriendship: %o`, friendship)
    })

    .on("room-invite", async (room) => {
      await handleRoomInvite(bot, room)
    })

    //////////////////////////////
    // social going
    //////////////////////////////

    .on("message", async (message) => {
      await handleMessage(bot, message)
    })

    .on("room-join", async (...args) => {
      await handleRoomJoin(bot, ...args)
    })

    .on("post", (post) => {
      logger.info(`onPost: %o`, post)
    })

    //////////////////////////////
    // utils
    //////////////////////////////

    .on("dong", (data) => {
      logger.info(`onDong: %o`, data)
    })

    .on("heartbeat", (data) => {
      // 比较频繁，大概一分钟一次这样子
      logger.debug(`onHeartbeat: %o`, data)
    })

    .on("puppet", (puppet) => {
      logger.info(`onPuppet: %o`, puppet)
    })

    .on("ready", () => {
      logger.info(`onReady`)
    })

    .on("start", () => {
      logger.info(`onStart`)
    })

    .on("stop", () => {
      logger.info(`onStop`)
    })

  return bot
}
