import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { sleep } from "../../../packages-to-classify/datetime/utils"

export type QueueTask = () => Promise<any>

export class SenderQueue {
  static queue: QueueTask[]
  static processing: boolean
  static qps: number

  constructor(qps = 10) {
    const QPS_MAX = 100
    if (qps > QPS_MAX) {
      qps = QPS_MAX
      logger.warn(`qps limited to be the max = ${QPS_MAX}`)
    }

    SenderQueue.qps = qps
    SenderQueue.queue = []
    SenderQueue.processing = false
  }

  get cnt() {
    return SenderQueue.queue.length
  }

  async addTask(task: QueueTask) {
    SenderQueue.queue.push(task)
    logger.info(`🆕 task(cnt=${this.cnt})`)
    if (!SenderQueue.processing) {
      SenderQueue.processing = true
      await this._runTask()
    }
  }

  private async _runTask() {
    while (SenderQueue.queue.length > 0) {
      try {
        const task = SenderQueue.queue.shift()!
        logger.info(`🏃🏻‍task(cnt=${this.cnt})`)
        await task()
        logger.info(`✅ task (cnt=${this.cnt})`)
      } catch (e) {
        formatError(e)
      } finally {
        await sleep(1000 / SenderQueue.qps) // 限时
      }
    }
    SenderQueue.processing = false
  }
}
