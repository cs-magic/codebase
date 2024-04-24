import { NotImplementedError } from "@cs-magic/common/schema/error"
import { formatQuery } from "@cs-magic/common/utils/format-query"
import { logger } from "@cs-magic/log/logger"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import set from "lodash/set"
import { type Message, Sayable, type Wechaty } from "wechaty"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { getBotContext } from "../../utils/bot-context"
import { botNotify } from "../../utils/bot-notify"
import { getBotTemplate } from "../../utils/bot-template"
import { formatFooter } from "../../utils/format-footer"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getConvTable } from "../../utils/get-conv-table"
import { getUserPreference } from "../../utils/get-user-preference"
import {
  padlocalVersion,
  parseQuote,
  parseText,
} from "../../utils/parse-message"
import { QueueTask } from "../sender-queue"

export class BaseManager {
  public message: Message
  public bot: Wechaty
  public name: FeatureType | null = null
  public i18n: FeatureMap<string> = {
    zh: {
      title: "小川助手",
      description: "",
      commands: {},
    },
    en: {
      title: "Okawa Plus",
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
    return parseQuote(this.message.text(), padlocalVersion)
  }

  get botWxid() {
    return this.bot.wxid
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    return this.conv.id
  }

  get talkingUser(): IUserSummary {
    const sender = this.message.talker()
    const image = sender.payload?.avatar
    // puppet-web有问题，拿不到avatar
    // if (!image) throw new Error("talking user has no avatar")

    return {
      id: sender.id,
      name: sender.name(),
      image: image ?? null,
    }
  }

  async getQuotedMessage() {
    if (this.quote?.quoted.version === "mark@2024-04-19") {
      const id = this.quote?.quoted.id
      if (id) {
        logger.debug(`quoted message id=${id}`)
        return await this.bot.Message.find({ id })
      }
    }
    return null
  }

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
  async getConvPreference() {
    return getConvPreference({ convId: this.convId, isRoom: this.isRoom })
  }

  async getUserPreference() {
    return getUserPreference(this.message)
  }

  async getLang() {
    return (await this.getConvPreference()).lang
  }

  async getContext() {
    return getBotContext(this.bot, this.message)
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

  async getTemplate() {
    return getBotTemplate(this.message, this.bot.staticContext)
  }

  async getStatus(reply = false) {
    const content = (await this.getTemplate()).status
    if (reply) await this.standardReply(content)
    return content
  }

  async getHelp(reply = false) {
    const content = (await this.getTemplate()).help
    if (reply) await this.standardReply(content)
    return content
  }

  async standardReply(content: string, tips?: string[]) {
    const preference = await this.getConvPreference()
    // truncate middle lines
    const N = preference.maxOutputLines ?? 20
    let lines = content.split("\n")
    if (lines.length > N) {
      lines = [
        ...lines.slice(0, N / 2),
        "...",
        ...lines.slice(lines.length - N / 2),
      ]
    }
    content = lines.join("\n")

    const context = await getBotContext(this.bot, this.message)
    const pretty = formatQuery(content, {
      title: await this.getTitle(),
      tips: tips ? tips.map((t) => `  ${t}`).join("\n") : undefined,
      footer: formatFooter(context),
      commandStyle: preference.commandStyle,
    })
    void this.addTask(() => this.message.say(pretty))
  }

  async help() {
    const commands = await this.getCommands()

    await this.standardReply(
      (await this.getDescription()) ?? "No Description",
      Object.keys(commands).length ? Object.keys(commands) : undefined,
    )
  }

  async addTask(task: QueueTask) {
    void this.bot.sendQueue.addTask(task)
  }

  async notify(content: Sayable) {
    void botNotify(this.bot, this.message, content)
  }

  async updatePreferenceInDB(path: string, value: any, replyStatus = true) {
    const conv = await this.getConvPreference()
    set(conv, path, value)
    await getConvTable(this.isRoom).update({
      where: {
        id: this.convId,
      },
      data: {
        preference: JSON.stringify(conv),
      },
    })
    if (replyStatus) await this.getStatus(true)
  }
}
