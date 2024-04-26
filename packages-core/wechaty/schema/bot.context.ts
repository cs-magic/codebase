import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatDuration } from "@cs-magic/common/utils/format-duration"
import { Job } from "node-schedule"
import { Message, Sayable, Wechaty } from "wechaty"
import packageJson from "../../../package.json"
import moment from "../../../packages-to-classify/datetime/moment"
import { QueueTask, SenderQueue } from "../utils/sender-queue"
import { formatTalkerFromMessage } from "../utils/format-talker"
import { LlmScenario } from "./bot.utils"

type BotData = {
  name: string
  version: string
  startTime: number
  wxid: string
  jobs: Job[]
}

export type IBotContext = BotData & {
  data: BotData
  addSendTask: (task: QueueTask) => Promise<void>
  notify: (
    message: Message,
    content: Sayable,
    llmScenario?: LlmScenario,
  ) => Promise<void>
  getHelp: () => Promise<string>
  getStatus: () => Promise<string>
}

export const initBotContext = async (bot: Wechaty): Promise<IBotContext> => {
  const name = "小川"
  const version = packageJson.version
  const startTime = Date.now()

  // wrap
  const s = /bot notification/i
  const notificationGroup = await bot.Room.find({ topic: s })
  if (!notificationGroup) throw new Error(`no notification group, regex: ${s}`)

  // wrap
  const senderQueue = new SenderQueue(10)

  // expose
  const addSendTask = async (task: QueueTask) => senderQueue.addTask(task)
  const botData: BotData = {
    name,
    version,
    startTime,
    jobs: [], // todo: await prisma.task.findMany({where: {timer: {}}})
    wxid: bot.currentUser.id,
  }

  return {
    ...botData,
    data: botData,
    addSendTask,
    notify: async (message, content, llmScenario) => {
      if (typeof content === "string") {
        content = [
          content,
          SEPARATOR_LINE,
          `by ${await formatTalkerFromMessage(message, llmScenario)}\n${moment().format("MM/DD hh:mm:ss")}`,
        ].join("\n")
      }
      void addSendTask(() => notificationGroup.say(content))
    },
    getHelp: async () => {
      return `
${name} Is an AI Native software, for individual/group intelligent management.
------------------------------
Feats：
  1. Parser: AI Parser for anything
  2. Chatter: AI Chatter knows anything
  3. Todo: Your Personal Task Manager (with Reminder)
  0. System: Preference Relative
------------------------------
Basic Commands：
  status: (show preference)
  help: (show usage)
`
    },
    getStatus: async () => {
      const aliveTime = formatDuration((Date.now() - botData.startTime) / 1e3)
      return `
Basic:
  name: ${name}
  version: ${version}
  alive-time: ${aliveTime}
------------------------------
Preference(Conv|User):
  model: {{convPreference.fetch.detail.summary.model}} | {{userPreference.fetch.detail.summary.model}}
  chatter enabled: {{{convPreference.chatterEnabled}}} | {{{userPreference.chatterEnabled}}}
  parser enabled: {{{convPreference.parserEnabled}}} | {{{userPreference.parserEnabled}}}
  backend: {{convPreference.fetch.detail.request.backendType}} | {{userPreference.fetch.detail.request.backendType}}
  max output lines: {{{convPreference.maxOutputLines}}} | {{{userPreference.maxOutputLines}}}
  command style: {{{convPreference.commandStyle}}} | {{{userPreference.commandStyle}}}
  onRoomJoin.sayAnnounce:
    enabled: {{{convPreference.onRoomJoin.sayAnnounce.enabled}}}
    n: {{{convPreference.onRoomJoin.sayAnnounce.n}}}
`
    },
  }
}
