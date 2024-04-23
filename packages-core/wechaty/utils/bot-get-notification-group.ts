import { Wechaty } from "wechaty"

export const botGetNotificationGroup = (bot: Wechaty) =>
  bot.Room.find({ topic: /bot notification/i })
