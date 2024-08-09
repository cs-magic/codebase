import { LogLevel } from "@cs-magic/common"
import { Message, Sayable } from "wechaty"
import { Job } from "node-schedule"

import { LlmScenario, QueueTask } from "../schema/index.js"

export type BotData = {
  name: string
  version: string
  startTime: number
  wxid: string
  // todo: job interface to be pure?
  jobs: Job[]
  puppet: {
    name: string
    type: "wechat4u" | "padlocal" | "unknown"
  }
}

export type IBotContext = BotData & {
  data: BotData
  addSendTask: (task: QueueTask) => Promise<void>
  notify: (
    content: Sayable,
    llmScenario?: LlmScenario,
    level?: LogLevel,
  ) => Promise<void>
  getHelp: () => Promise<string>
  getStatus: (message: Message) => Promise<string>
}
