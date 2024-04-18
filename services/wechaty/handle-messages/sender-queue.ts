import { logger } from "@cs-magic/log/logger"
import { sleep } from "../../../packages/common-datetime/utils"

export type QueueTask = () => Promise<any>

export class SenderQueue {
  private queue: QueueTask[]
  private processing: boolean
  private qps: number

  constructor(qps = 10) {
    const QPS_MAX = 100
    if (qps > QPS_MAX) {
      qps = QPS_MAX
      logger.warn(`qps limited to be the max = ${QPS_MAX}`)
    }

    this.qps = qps
    this.queue = []
    this.processing = false
  }

  async addTask(task: QueueTask) {
    this.queue.push(task)
    // logger.info(`-- onMessage: Q(n=${this.queue.length}), ${prettyMessage(message)}`)
    if (!this.processing) {
      this.processing = true
      await this._runTask()
    }
  }

  private async _runTask() {
    while (this.queue.length > 0) {
      const task = this.queue.shift()!
      logger.info(`running task(${this.queue.length})`)
      await task()
      await sleep(1000 / this.qps) // 限时
    }
    this.processing = false
  }
}
