import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { ScanStatus, Wechaty } from "wechaty"
import { initBotContext } from "../schema/bot.context"
import { handleFriendship } from "./handle-friendship"
import { handleRoomInvite } from "./handle-room-invite"
import { handleRoomJoin } from "./handle-room-join"
import { handleMessage } from "./handle-message"

export const handleWechatyBot = (bot: Wechaty) => {
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

    .on("friendship", async (friendship) => {
      await handleFriendship(bot, friendship)
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
      // logger.debug(`onHeartbeat: %o`, data)
      logger.debug(".")
    })

    .on("puppet", (puppet) => {
      logger.debug(`onPuppet: %o`, puppet)
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
}
