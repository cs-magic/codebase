import { NotImplementedError } from "@cs-magic/common/schema/error"
import { formatQuery } from "@cs-magic/common/utils/format-query"
import { type Message, Sayable, type Wechaty } from "wechaty"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { CommandStyle } from "../../schema/wechat-user"
import { getBotContext } from "../../utils/bot-context"
import { botNotify } from "../../utils/bot-notify"
import { getBotTemplate } from "../../utils/bot-template"
import { formatFooter } from "../../utils/format-footer"
import { formatTalker } from "../../utils/format-talker"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getUserPreference } from "../../utils/get-user-preference"
import { QueueTask } from "../sender-queue"

export const getQuote = async (message: Message) => {
  console.log({ message })
  const post = await message.toPost()
  console.log({ post })
  const parent = await post.parent()
  console.log({ parent })

  const m = /^「(.*?)：(.*?)」\n- - - - - - - - - - - - - - -\n(.*)$/.exec(
    message.text(),
  )

  return {
    userName: m?.[1],
    quotedTitle: m?.[2],
    content: m?.[3],
  }
}

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

  get rawText() {
    return this.message.text()
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

  async formatTalker() {
    return await formatTalker(this.message)
  }

  async parse(input?: string) {
    throw new NotImplementedError()
  }

  /**
   * todo: cache preference
   */
  async getConvPreference() {
    return getConvPreference(this.message)
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
    const pretty = formatQuery(
      content,
      preference.commandStyle === CommandStyle.standard
        ? {
            title: await this.getTitle(),
            tips: tips ? tips.map((t) => `  ${t}`).join("\n") : undefined,
            footer: formatFooter(context),
          }
        : undefined,
    )
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
    void botNotify(this.bot, content)
  }
}
