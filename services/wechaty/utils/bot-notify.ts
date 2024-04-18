import { logger } from "@cs-magic/log/logger"
import { Sayable, Wechaty } from "wechaty"
import moment from "../../../packages/common-datetime/moment"
import { botGetNotificationGroup } from "./bot-get-notification-group"

export const botNotify = async (bot: Wechaty, content: Sayable) => {
  const group = await botGetNotificationGroup(bot)
  if (!group) return logger.error(`no notification group found`)
  if (typeof content === "string") {
    content = `[${moment().format()}] ${content}`
  }
  void bot.sendQueue.addTask(() => group.say(content))
}
