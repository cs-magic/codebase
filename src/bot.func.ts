"use server"

import { createWechatyBot } from "packages/common-wechaty/create-wechaty-bot"

const bot = createWechatyBot({ name: "default" })

export const startBot = async () => {
  await bot.start()
}

export const stopBot = async () => {
  await bot.stop()
}

export const checkBot = async () => {
  return bot.state
}
