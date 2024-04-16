import { logger } from "@cs-magic/log/logger"
import { type Message, type Wechaty } from "wechaty"
import { sleep } from "../../../packages/common-datetime/utils"
import { prettyMessage } from "../utils/pretty-message"
import { handleMessage } from "./handle-message"

export class MessageQueue {
  private queue: Array<Message>
  private processing: boolean
  private bot: Wechaty
  private qps: number

  constructor(bot: Wechaty, qps = 10) {
    const QPS_MAX = 100
    if (qps > QPS_MAX) {
      qps = QPS_MAX
      console.warn(`qps limited to be the max = ${QPS_MAX}`)
    }

    this.bot = bot
    this.qps = qps

    this.queue = []
    this.processing = false
  }

  async enqueueMessage(message: Message) {
    this.queue.push(message)
    // logger.info(`-- onMessage: Q(n=${this.queue.length}), ${prettyMessage(message)}`)
    if (!this.processing) {
      this.processing = true
      await this._processMessage()
    }
  }

  private async _processMessage() {
    while (this.queue.length > 0) {
      const message = this.queue.shift()!
      logger.info(
        `-- processMessage(${this.queue.length}): ${prettyMessage(message)}`,
      )
      await handleMessage(this.bot, message)
      await sleep(1000 / this.qps) // 限时
    }
    this.processing = false
  }
}
