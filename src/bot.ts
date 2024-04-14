"use server"

import { staticCreate } from "../packages/common-algo/singleton"
import { createWechatyBot } from "../packages/common-wechaty/create-wechaty-bot"

const bot = staticCreate(() => createWechatyBot({ name: "default" }))

export const startBot = async () => {
  await bot.start()
}

export const stopBot = async () => {
  await bot.stop()
}

export const checkBot = async () => {
  return bot.state
}
