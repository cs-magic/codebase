import { logger } from "@cs-magic/log/logger"
import { type Message, type Wechaty } from "wechaty"
import { sleep } from "../../../packages/datetime/utils"
import { formatMessage } from "../utils/format-message"
import { handleMessage } from "./handle-message"

/**
 * @deprecated 这个是基于收到消息级别的限速，这会导致整个 message queue 被 block 住，应该只需要对 say/forward 的动作做限速即可
 */
export class ReceiverQueue {
  private queue: Array<Message>
  private processing: boolean
  private bot: Wechaty
  private qps: number

  constructor(bot: Wechaty, qps = 10) {
    const QPS_MAX = 100
    if (qps > QPS_MAX) {
      qps = QPS_MAX
      logger.warn(`qps limited to be the max = ${QPS_MAX}`)
    }

    this.bot = bot
    this.qps = qps

    this.queue = []
    this.processing = false
  }

  async enqueueMessage(message: Message) {
    this.queue.push(message)
    if (!this.processing) {
      this.processing = true
      await this._processMessage()
    }
  }

  private async _processMessage() {
    while (this.queue.length > 0) {
      const message = this.queue.shift()!
      logger.info(
        `-- processMessage(${this.queue.length}): ${formatMessage(message)}`,
      )
      await handleMessage(this.bot, message)
      await sleep(1000 / this.qps) // 限时
    }
    this.processing = false
  }
}
