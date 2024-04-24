import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { isWxmpArticleUrl } from "@cs-magic/common/utils/is-wxmp-article-url"
import {
  parseTitleFromWechatUrlMessage,
  parseUrlFromWechatUrlMessage,
} from "@cs-magic/common/utils/parse-url-from-wechat-url-message"
import { logger } from "@cs-magic/log/logger"

import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { FileBox } from "file-box"
import { z } from "zod"
import { CardSimulator } from "../../../../packages-to-classify/spider/card-simulator"
import { url2preview } from "../../../common/url2preview"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { getQuotedMessage } from "../../utils/get-quoted-message"
import { parseLimitedCommand } from "../../utils/parse-command"
import { parseText } from "../../utils/parse-message"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum(["enable", "disable"])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  zh: {
    title: "万能解析器",
    description: "您可以发送一篇公众号文章给我，我将为您解析，生成精美的卡片",
    commands: {
      启动: {
        type: "enable",
        description: "启用万能解析器",
      },
      停止: {
        type: "disable",
        description: "停止万能解析器",
      },
    },
  },
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
        `  - enabled: ${preference.parserEnabled}`,
      ].join("\n"),
      Object.keys(commands).map((command) => `  ${this.name} ${command}`),
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

    const commands = this.i18n[await this.getLang()].commands

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
          await this.updatePreferenceInDB("parserEnabled", true, false)
          await this.standardReply(
            `Congratulation, Super Parser has been activated!\nI can help you parse shared links, give me a try! 😄`,
            [
              "- I currently supports wxmp article, other media types (e.g. videos) are on the roadmap, hold on!",
              "- You can deactivate me via sending: `parser disable`.",
            ],
          )
          break

        case "disable":
          await this.updatePreferenceInDB("parserEnabled", false, false)
          await this.standardReply(
            `Okay, I'm going to take a break!\nFeel free to activate me again when you need me~ 👋🏻`,
            ["- You can activate me via sending: `parser enable`."],
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
    if (!convPreference.parserEnabled)
      return logger.info(`passed since parser disabled`)

    try {
      // initLogWithTimer()

      ++ParserManager.toParse
      const title = parseTitleFromWechatUrlMessage(text)
      void this.notify(`🌈 正在解析[${ParserManager.toParse}]: ${title}`)

      if (!ParserManager.uniParser)
        ParserManager.uniParser = new CardSimulator()

      const inner = await url2preview(url, convPreference.fetch)

      const { cardUrl } = await ParserManager.uniParser.genCard(
        JSON.stringify(inner),
        user,
      )
      logger.info(`-- sending file: ${cardUrl}`)

      const file = FileBox.fromUrl(cardUrl)
      void this.addTask(async () => this.conv?.say(file))
      void this.notify(`✅ 解析成功: ${title}`)
      logger.info("-- sent file")
    } catch (e) {
      const s = formatError(e)
      void this.notify(`❌ ` + s)
    } finally {
      --ParserManager.toParse
    }
  }
}
