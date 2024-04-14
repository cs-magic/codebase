import { createWechatyBot } from "./create-wechaty-bot"

const bot = createWechatyBot({ name: process.argv[2] ?? "default" })
void bot.start()
