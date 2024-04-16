import { NotImplementedError } from "@cs-magic/common/schema/error"
import { compressContent } from "@cs-magic/common/utils/compress-content"
import { type Message, type Wechaty } from "wechaty"
import { FeatureMap, FeatureType } from "../../schema/commands"
import {
  getBotContextFromMessage,
  getBotDynamicContext,
} from "../../utils/bot-context"
import { renderBotTemplate } from "../../utils/bot-template"
import { formatBotQuery } from "../../utils/format-bot-query"
import { getConvPreference } from "../../utils/get-conv-preference"
import remove from "lodash/remove"

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

  get botWxid() {
    return this.bot.wxid
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    return this.conv.id
  }

  async parse(input?: string) {
    throw new NotImplementedError()
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

  async standardReply(content: string, tips?: string[], compress = true) {
    // truncate middle lines
    if (compress) {
      let lines = content.split("\n")
      if (lines.length > 10) {
        lines = [...lines.slice(0, 5), "...", ...lines.slice(lines.length - 5)]
      }
      content = lines.join("\n")
    }

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
      Object.keys(commands).length ? Object.keys(commands) : undefined,
    )
  }
}
