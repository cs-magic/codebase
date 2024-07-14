import {
  formatAction,
  formatDuration,
  logger,
  LogLevel,
  SEPARATOR_LINE,
} from "@cs-magic/common"
import { BotData, IBotContext, QueueTask } from "@cs-magic/swot-bot-core"
import { Wechaty } from "wechaty"
import { getConvPreference } from "./get-conv-preference"
import { SenderQueue } from "./sender-queue"
import yaml from "js-yaml"

export const initBotContext = async (bot: Wechaty): Promise<IBotContext> => {
  const name = "飞脑"
  const version = process.env.npm_package_version ?? "0.1.0"
  const startTime = Date.now()

  // web protocol needs, o.w. rooms/contacts are loaded PARTIALLY
  await formatAction(bot.ready, "waiting bot ready")

  const rooms = await bot.Room.findAll()
  await Promise.all(
    rooms.map(async (room, index) => {
      logger.debug(
        `[${index + 1}] Room(id=${room.id}, topic=${await room.topic()})`,
      )
    }),
  )

  // wrap
  const senderQueue = new SenderQueue(10)

  // expose
  const addSendTask = async (task: QueueTask) => senderQueue.addTask(task)

  const puppet = bot.puppet
  const puppetName = puppet.name()
  const botData: BotData = {
    name,
    version,
    startTime,
    jobs: [], // todo: await prisma.task.findMany({where: {timer: {})
    wxid: bot.currentUser.id,
    puppet: {
      name: puppetName,
      type: puppetName.includes("padlocal")
        ? "padlocal"
        : puppetName.includes("wechat4u")
          ? "wechat4u"
          : "unknown",
    },
  }
  logger.debug(`bot data: %o`, botData)

  return {
    ...botData,
    data: botData,
    addSendTask,
    notify: async (content, llmScenario, level) => {
      void addSendTask(async () => {
        // !important 需要在手机上，手动地把对应的群，保存到通讯录，否则找不到
        ;(await bot.Room.find({ topic: /飞脑通知/i }))?.say(content)

        if (level && level >= LogLevel.error)
          (await bot.Room.find({ topic: /飞脑报错/i }))?.say(content)
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
