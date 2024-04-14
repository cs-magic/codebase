
import { Wechaty } from "wechaty"
import { createWechatyBot } from "../packages/common-wechaty/create-wechaty-bot"

export class BotBridge {
  private bot: Wechaty

  constructor() {
    this.bot = createWechatyBot({ name: "default" })
  }

  async start() {
    await this.bot.start()
  }

  async stop() {
    await this.bot.stop()
  }

  async check() {
    return this.bot.state
  }
}
