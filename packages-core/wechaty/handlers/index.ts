import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatString } from "@cs-magic/common/utils/format-string"
import { logger } from "@cs-magic/log/logger"
import { LogLevel } from "@cs-magic/log/schema"
import qrcodeTerminal from "qrcode-terminal"
import { ScanStatus, Wechaty } from "wechaty"
import moment from "../../../packages-to-classify/datetime/moment"
import { initBotContext } from "../schema/bot.context"
import { formatTalkerFromMessage } from "../utils/format-talker"
import { handleFriendship } from "./handle-friendship"
import { handleMessage } from "./handle-message"
import { handleRoomInvite } from "./handle-room-invite"
import { handleRoomJoin } from "./handle-room-join"

export const safeHandle = async (
  bot: Wechaty,
  p: Promise<unknown>,
  suffix?: string,
) => {
  try {
    return await p
  } catch (e) {
    let s = formatError(e)

    if (suffix) {
      s = [s, SEPARATOR_LINE, suffix].join("\n")
    }

    // if we should expose to the user
    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id"))
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`

    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    // void botNotify(bot, await formatBotQuery(context, "哎呀出错啦", s))
    void bot.context?.notify(`❌ ${s}`, undefined, LogLevel.error)
  }
}

export const handleWechatyBot = (bot: Wechaty) => {
  bot
    //////////////////////////////
    // basic
    //////////////////////////////

    .on("scan", async (qrcode, status, data) => {
      logger.info(
        `onScan (status=${ScanStatus[status]}, data=${formatString(data ?? "", 20)}), scan the following qrcode or from wechaty official: https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`,
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
      // 只要handle 一次
      formatError(err)
    })

    //////////////////////////////
    // social
    //////////////////////////////

    .on("message", async (message) => {
      await safeHandle(
        bot,
        handleMessage(bot, message),
        `by ${await formatTalkerFromMessage(
          message,
          // todo: get type of inner
          undefined,
        )}\n${moment().format("MM/DD hh:mm:ss")}`,
      )
    })

    .on("friendship", async (friendship) => {
      await safeHandle(bot, handleFriendship(bot, friendship))
    })

    .on("room-invite", async (room) => {
      await safeHandle(bot, handleRoomInvite(bot, room))
    })

    .on("room-join", async (...args) => {
      await safeHandle(bot, handleRoomJoin(bot, ...args))
    })

    .on("post", (post) => {
      logger.info(`onPost: %o`, post)
    })

    //////////////////////////////
    // utils
    //////////////////////////////

    .on("puppet", async (puppet) => {
      logger.debug(`onPuppet`)
      // 不要打印它，太长了；也不要存储，因为自循环
      // logger.debug(puppet)
    })

    .on("heartbeat", (data) => {
      // 比较频繁，大概一分钟一次这样子
      // logger.debug(`onHeartbeat: %o`, data)
      logger.debug(".")
    })

    .on("start", () => {
      logger.info(`onStart`)
    })

    .on("ready", () => {
      logger.info(`onReady`)
    })

    .on("dong", (data) => {
      logger.info(`onDong: %o`, data)
    })

    .on("stop", () => {
      logger.info(`onStop`)
    })
}
