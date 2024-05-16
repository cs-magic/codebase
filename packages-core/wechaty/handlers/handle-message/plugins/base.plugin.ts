import { NotImplementedError } from "@cs-magic/common/schema/error"
import { evalObject } from "@cs-magic/common/utils/eval-object"
import { logger } from "@cs-magic/log/logger"
import { LogLevel } from "@cs-magic/log/schema"
import {
  IUserSummary,
  IUserSummaryFilled,
} from "@cs-magic/prisma/schema/user.summary"
import { md5 } from "js-md5"
import set from "lodash/set"
import * as repl from "node:repl"
import { Message, Sayable, type Wechaty } from "wechaty"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { IWechatData, IWechatPreference } from "../../../schema/bot.preference"

import { LlmScenario } from "../../../schema/bot.utils"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { formatFooter } from "../../../utils/format-footer"
import { formatQuery } from "../../../utils/format-query"
import {
  getConvData,
  getConvPreference,
} from "../../../utils/get-conv-preference"
import {
  padlocalVersion,
  parseQuote,
  parseText,
} from "../../../utils/parse-message"

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
    return parseQuote(this.message.text(), padlocalVersion)
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    return this.conv.id
  }

  async getTalkingUser(): Promise<IUserSummaryFilled> {
    const sender = this.message.talker()
    const image =
      this.bot.context?.puppet.type === "padlocal"
        ? sender.payload!.avatar
        : await (await sender.avatar()).toDataURL()
    logger.info(`fetching talking User(image=${image})`)
    // puppet-web有问题，拿不到avatar
    // if (!image) throw new Error("talking user has no avatar")

    return {
      name: sender.name(),
      image: image,
    }
  }

  async getUserIdentity() {
    return `${this.message.talker().id}_${this.room?.id}@wechat`
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
    void this.bot.context?.notify(this.message, content, llmScenario, level)
  }

  async reply(message: Sayable) {
    await this.bot.context?.addSendTask(async () => {
      await this.message.say(message)
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
