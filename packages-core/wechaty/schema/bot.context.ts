import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatAction } from "@cs-magic/common/utils/format-action"
import { formatDuration } from "@cs-magic/common/utils/format-duration"
import { logger } from "@cs-magic/log/logger"
import yaml from "js-yaml"
import { Job } from "node-schedule"
import { Message, Sayable, Wechaty } from "wechaty"
import packageJson from "../../../package.json"
import moment from "../../../packages-to-classify/datetime/moment"
import { formatTalkerFromMessage } from "../utils/format-talker"
import { getConvPreference } from "../utils/get-conv-preference"
import { QueueTask, SenderQueue } from "../utils/sender-queue"
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
  getStatus: (message: Message) => Promise<string>
}

export const initBotContext = async (bot: Wechaty): Promise<IBotContext> => {
  const name = "飞脑"
  const version = packageJson.version
  const startTime = Date.now()

  // web protocol needs, o.w. rooms/contacts are loaded PARTIALLY
  await formatAction(async () => await bot.ready(), "waiting bot ready")

  const rooms = await bot.Room.findAll()
  await Promise.all(
    rooms.map(async (room, index) => {
      logger.debug(
        `[${index + 1}] Room(id=${room.id}, topic=${await room.topic()})`,
      )
    }),
  )
  // wrap
  const s = /bot notification/i
  // !important 需要在手机上，手动地把对应的群，保存到通讯录，否则找不到

  // wrap
  const senderQueue = new SenderQueue(10)

  // expose
  const addSendTask = async (task: QueueTask) => senderQueue.addTask(task)

  const botData: BotData = {
    name,
    version,
    startTime,
    jobs: [], // todo: await prisma.task.findMany({where: {timer: {})
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
      void addSendTask(async () => {
        const notificationGroup = await bot.Room.find({ topic: s })
        if (!notificationGroup)
          return logger.debug(
            `skipped notifying since no notification group found`,
          )
        await notificationGroup.say(content)
      })
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
    getStatus: async (message) => {
      const aliveTime = formatDuration((Date.now() - botData.startTime) / 1e3)
      const convPreference = await getConvPreference({
        convId: message.conversation().id,
      })
      return [
        yaml.dump({ Basic: { name, version, aliveTime } }),
        yaml.dump({ Preference: convPreference }),
      ].join(SEPARATOR_LINE + "\n")
    },
  }
}
