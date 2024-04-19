import { logger } from "@cs-magic/log/logger"
import { Message, Sayable, Wechaty } from "wechaty"
import moment from "../../../packages/common-datetime/moment"
import { botGetNotificationGroup } from "./bot-get-notification-group"
import { formatTalkerFromMessage } from "./format-talker"

export const botNotify = async (
  bot: Wechaty,
  message: Message,
  content: Sayable,
) => {
  const group = await botGetNotificationGroup(bot)
  if (!group) return logger.error(`no notification group found`)
  if (typeof content === "string") {
    content = `${content}\n--------\nby ${await formatTalkerFromMessage(message)}\n${moment().format("MM/DD hh:mm:ss")}`
  }
  void bot.sendQueue.addTask(() => group.say(content))
}
