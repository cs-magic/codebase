import { type Message, type Wechaty } from "wechaty"
import { type LangType } from "../../../../packages/common-i18n/schema"
import {
  getBotContextFromMessage,
  getBotDynamicContext,
} from "../../utils/bot-context"
import { renderBotTemplate } from "../../utils/bot-template"
import { formatBotQuery } from "../../utils/format-bot-query"
import { getConvPreference } from "../../utils/get-conv-preference"

export type ICommandData = Record<string, string>

export type IManagerI18n = {
  title: string
  commands?: ICommandData
  description?: string
}

export class BaseManager {
  public message: Message
  public bot: Wechaty
  public i18n: Partial<Record<LangType, IManagerI18n>> = {}

  constructor(bot: Wechaty, message: Message) {
    // todo: bot on message
    this.bot = bot
    this.message = message
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

  /**
   * todo: cache preference
   */
  async getPreference() {
    return getConvPreference(this.message)
  }

  async getLang() {
    return (await this.getPreference()).lang
  }

  async getContext() {
    return getBotDynamicContext(await this.getLang())
  }

  async getData() {
    return (
      this.i18n[await this.getLang()] ?? {
        title: (await this.getContext()).name,
        commands: {},
      }
    )
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
    return renderBotTemplate(this.message, this.bot.staticContext)
  }

  async getStatus() {
    return (await this.getTemplate()).status
  }

  async getHelp() {
    return (await this.getTemplate()).help
  }

  async standardReply(content: string, tips?: string[]) {
    const context = await getBotContextFromMessage(this.bot, this.message)
    const pretty = await formatBotQuery(
      context,
      await this.getTitle(),
      content,
      tips,
    )
    await this.message.say(pretty)
  }

  async help() {
    const commands = await this.getCommands()

    await this.standardReply(
      (await this.getDescription()) ?? "No Description",
      commands ? Object.keys(commands) : commands,
    )
  }
}
