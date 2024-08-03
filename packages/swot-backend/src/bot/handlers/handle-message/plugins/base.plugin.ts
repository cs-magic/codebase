import {
  evalObject,
  formatString,
  IUserSummaryFilled,
  logger,
  LogLevel,
  NotImplementedError,
  wechatMessageDetailSchema,
} from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/db/prisma.js"

import set from "lodash/set"
import { Message, Sayable, type Wechaty } from "wechaty"
import { deserializeMsg, puppetVersion } from "wechaty-puppet"

import {
  FeatureMap,
  FeatureType,
  IWechatData,
  IWechatPreference,
  LlmScenario,
} from "../../../../schema/index.js"
import {
  formatFooter,
  formatQuery,
  getConvData,
  getConvPreference,
  parseText,
} from "../../../utils/index.js"

export class BasePlugin {
  public message: Message
  public bot: Wechaty
  public name: FeatureType | null = null
  public i18n: FeatureMap<string> = {
    zh: {
      title: "飞脑助手",
      description: "",
      commands: {},
    },
    en: {
      title: "SWOT",
      description: "",
      commands: {},
    },
  }

  constructor(bot: Wechaty, message: Message) {
    // todo: bot on message
    this.bot = bot
    this.message = message
  }

  get room() {
    return this.message.room()
  }

  get isRoom() {
    return !!this.room
  }

  get text() {
    return parseText(this.message.text())
  }

  get quote() {
    return deserializeMsg(this.message.text(), puppetVersion)
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    const convId = this.conv.id
    logger.debug({ convId })
    return convId
  }

  async getTalkingUser(): Promise<IUserSummaryFilled> {
    const sender = this.message.talker()
    const user: IUserSummaryFilled = {
      name: sender.name(),
      image: undefined,
    }

    if (this.bot.context?.puppet.type === "padlocal") {
      user.image = sender.payload!.avatar
    } else {
      const avatar = await sender.avatar()
      // 有可能拿不到 avatar
      if (avatar) {
        user.image = await avatar.toDataURL()
      }
    }

    return user
  }

  async getUserIdentity() {
    return `${this.message.talker().id}_${this.room?.id}@wechat`
  }

  async getLatestMessages(n = 10) {
    const messages = await prisma.wechatMessage.findMany({
      ...wechatMessageDetailSchema,
      where: {
        // 三者任一即可
        OR: [
          { roomId: this.convId },
          { listenerId: this.convId, talkerId: this.bot.context?.wxid },
          { talkerId: this.convId, listenerId: this.bot.context?.wxid },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      take: -n,
    })

    logger.debug(messages.map((m) => formatString(JSON.stringify(m), 120)))
    return messages
  }

  async getQuotedMessage() {
    if (this.quote?.quoted.version === "mark@2024-04-19") {
      const quoted = this.quote?.quoted
      if ("id" in quoted) {
        const id = quoted.id
        logger.debug(`quoted message id=${id}`)
        return await this.bot.Message.find({ id })
      }
    }
    return null
  }

  /**
   * 最好用户 recall 玩之后，用户的消息还可以recall，不过目前还不支持，也许可以recall 多条 类似 recall -n 3 之类
   */
  async recallQuotedMessage() {
    const quotedMessage = await this.getQuotedMessage()
    logger.info(`quoted message: %o`, quotedMessage)
    return quotedMessage?.recall()
  }

  async getRoomTopic() {
    return await this.room?.topic()
  }

  async parse(input?: string) {
    throw new NotImplementedError()
  }

  /**
   * todo: cache preference
   */
  async getConvPreference(): Promise<IWechatPreference> {
    return getConvPreference({ convId: this.convId })
  }

  async getConvData(): Promise<IWechatData> {
    return getConvData({ convId: this.convId })
  }

  async getLang() {
    return (await this.getConvPreference()).display.lang
  }

  async getData() {
    return this.i18n[await this.getLang()] ?? this.i18n.en
  }

  async getTitle() {
    return (await this.getData()).title
  }

  async getDescription() {
    return (await this.getData()).description
  }

  async getCommands() {
    return (await this.getData()).commands
  }

  async getStatus(reply = false) {
    const content = await this.bot.context?.getStatus(this.message)
    if (content && reply) await this.standardReply(content)
    return content
  }

  async getHelp(reply = false) {
    const content = await this.bot.context?.getHelp()
    if (content && reply) await this.standardReply(content)
    return content
  }

  async standardReply(content: string, tips?: string[]) {
    const preference = await this.getConvPreference()
    // truncate middle lines
    const N = preference.display.maxLines
    let lines = content.split("\n")
    if (lines.length > N) {
      lines = [
        ...lines.slice(0, N / 2),
        "...",
        ...lines.slice(lines.length - N / 2),
      ]
    }
    content = lines.join("\n")

    const pretty = formatQuery(content, {
      title: await this.getTitle(),
      tips: tips ? tips.map((t) => `  ${t}`).join("\n") : undefined,
      footer: formatFooter(this.bot.context?.data),
      commandStyle: preference.display.style,
    })
    void this.bot.context?.addSendTask(() => this.message.say(pretty))
  }

  async help() {
    const commands = await this.getCommands()

    await this.standardReply(
      (await this.getDescription()) ?? "No Description",
      Object.keys(commands).length ? Object.keys(commands) : undefined,
    )
  }

  async notify(content: Sayable, llmScenario?: LlmScenario, level?: LogLevel) {
    void this.bot.context?.notify(content, llmScenario, level)
  }

  async reply(message: Sayable) {
    await this.bot.context?.addSendTask(async () => {
      const sentMessage = await this.message.say(message)
      logger.debug(`\n-- sentMessage: [%o]`, sentMessage)

      // await storageMessage(message)
    })
  }

  async updatePreferenceInDB(
    path: string,
    value: string,
    // if string, reply with the string
    // if boolean, reply with status
    reply: string | boolean | undefined = undefined,
    level: "user" | "conv" = "conv",
  ) {
    const updatePreference = (preference: IWechatPreference) => {
      const convertedValue = evalObject(value)

      logger.info(
        `updating preference: path=${path}, value=${value}, preference=${JSON.stringify(preference)}`,
      )
      // migrate v1 --> v2
      set(preference, path, convertedValue)
      logger.info(
        `updated preference: path=${path}, value=${value}, preference=${JSON.stringify(preference)}`,
      )
    }

    const preference = await this.getConvPreference()

    updatePreference(preference)

    await prisma.wechatConv.update({
      where: { id: this.convId },
      data: {
        preference: JSON.stringify(preference),
      },
    })

    if (reply) {
      if (typeof reply === "string") {
        await this.reply(reply)
      }

      if (typeof reply === "boolean") {
        await this.getStatus(true)
      }
    }
  }
}
