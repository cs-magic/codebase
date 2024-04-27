import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { isWxmpArticleUrl } from "@cs-magic/common/utils/is-wxmp-article-url"
import {
  parseTitleFromWechatUrlMessage,
  parseUrlFromWechatUrlMessage,
} from "@cs-magic/common/utils/parse-url-from-wechat-url-message"
import { logger } from "@cs-magic/log/logger"
import { url2preview } from "@cs-magic/p01-common/url2preview"

import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { FileBox } from "file-box"
import { z } from "zod"
import { CardSimulator } from "../../../../../packages-to-classify/spider/card-simulator"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { getQuotedMessage } from "../../../utils/get-quoted-message"
import { parseLimitedCommand } from "../../../utils/parse-command"
import { parseText } from "../../../utils/parse-message"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum(["enable", "disable"])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Super Parser",
    description:
      "Hello, I am the Super Parser!" +
      "\nI can parse almost anything!" +
      "\nSend me one wxmp article, now! 😠",
    commands: {
      enable: {
        type: "enable",
        description: "enable super parser",
      },
      disable: {
        type: "disable",
        description: "disable super parser",
      },
    },
  },
}

export class ParserManager extends BaseManager {
  static name: FeatureType = "parser"
  static uniParser: CardSimulator | null = null
  static toParse = 0
  public i18n = i18n

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    const preference = await this.getConvPreference()
    await this.standardReply(
      [
        desc,
        SEPARATOR_LINE,
        "Status:",
        `  - enabled: ${preference.features.parser.enabled}`,
        `  - model  : ${preference.features.parser.model}`,
      ].join("\n"),
      Object.keys(commands).map(
        (command) => `  ${ParserManager.name} ${command}`,
      ),
    )
  }

  async parseSelf() {
    const message = this.message
    const rawText = message.text()
    // console.log({ message, rawText })
    const text = await z.string().parseAsync(rawText)
    // console.log({ text })

    return this.safeParseCard({
      user: this.talkingUser,
      message: {
        convId: this.convId,
        roomTopic: await this.getRoomTopic(),
        talkerName: this.talkingUser.name ?? "",
        text,
        id: message.id,
      },
    })
  }

  async parseQuote() {
    if (!this.quote) return

    const v = this.quote.quoted.version
    const message = await getQuotedMessage(
      v === "mark@2024-04-19" ? this.quote.quoted.id : undefined,
      this.quote.quoted.content ?? "",
    )

    const text = await z.string().parseAsync(message.text)

    return this.safeParseCard({
      user: this.talkingUser,
      message: {
        convId: this.convId,
        roomTopic: await this.getRoomTopic(),
        talkerName: this.talkingUser.name ?? "",
        text,
        id: message.id,
      },
    })
  }

  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()]?.commands
    if (!commands) return

    const commandTypeSchema = z.enum(
      Object.keys(commands) as [string, ...string[]],
    )

    const parsed = parseLimitedCommand(input ?? "", commandTypeSchema)

    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]?.type
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)
      switch (commandType) {
        case "enable":
          await this.updatePreferenceInDB("features.parser.enabled", true, true)
          break

        case "disable":
          await this.updatePreferenceInDB(
            "features.parser.enabled",
            false,
            true,
          )
          break
      }
    }
  }

  async safeParseCard({
    user,
    message,
  }: {
    // todo: dynamic sender with fixed card url
    user: IUserSummary
    message: {
      convId: string
      text: string
      id: string
      roomTopic?: string
      talkerName: string
    }
  }) {
    const text = parseText(message.text)
    const url = parseUrlFromWechatUrlMessage(text)
    // 仅供测试环境
    // await dumpFile({ text: message.text, url }, `${Date.now()}.json`)
    logger.info(`parser url=${url}`)
    if (!url) return

    if (!isWxmpArticleUrl(url))
      return logger.info(`passed since it's not wxmp article`)

    const convPreference = await this.getConvPreference()
    if (!convPreference.features.parser.enabled)
      return logger.info(`passed since parser disabled`)

    try {
      // initLogWithTimer()

      ++ParserManager.toParse
      const title = parseTitleFromWechatUrlMessage(text)
      void this.notify(
        `🌈 正在解析[${ParserManager.toParse}]: ${title}`,
        "parser",
      )

      if (!ParserManager.uniParser)
        ParserManager.uniParser = new CardSimulator()

      // todo: add userIdentity into parser
      const inner = await url2preview(url, convPreference.fetch)

      const { cardUrl } = await ParserManager.uniParser.genCard(
        JSON.stringify(inner),
        user,
      )
      logger.info(`-- sending file: ${cardUrl}`)

      const file = FileBox.fromUrl(cardUrl)
      void this.bot.context.addSendTask(async () => this.conv?.say(file))
      void this.notify(`✅ 解析成功: ${title}`, "parser")
      logger.info("-- sent file")
    } catch (e) {
      const s = formatError(e)
      void this.notify(`❌ ` + s, "parser")
    } finally {
      --ParserManager.toParse
    }
  }
}
