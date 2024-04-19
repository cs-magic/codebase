import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { formatString } from "@cs-magic/common/utils/format-string"
import { initLogWithTimer } from "@cs-magic/common/utils/init-log-with-timer"
import { isWxmpArticleUrl } from "@cs-magic/common/utils/is-wxmp-article-url"
import { parseUrlFromWechatUrlMessage } from "@cs-magic/common/utils/parse-url-from-wechat-url-message"
import { logger } from "@cs-magic/log/logger"
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { FileBox } from "file-box"
import { z } from "zod"
import { fetchWxmpArticleWithCache } from "../../../../packages/3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { CardSimulator } from "../../../../packages/common-spider/card-simulator"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { formatTalker } from "../../utils/format-talker"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getConvTable } from "../../utils/get-conv-table"
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
  public i18n = i18n
  public name: FeatureType = "parser"
  private uniParser: CardSimulator | null = null
  private toParse = 0

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
        talkerName: this.talkingUser.name,
        text,
        id: message.id,
      },
    })
  }

  async parseQuote() {
    if (!this.quote) return

    const message = await getQuotedMessage(this.quote.quoted)

    const text = await z.string().parseAsync(message.text)

    return this.safeParseCard({
      user: this.talkingUser,
      message: {
        convId: this.convId,
        roomTopic: await this.getRoomTopic(),
        talkerName: this.talkingUser.name,
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
          await this.enableParser()
          break

        case "disable":
          await this.disableParser()
          break
      }
    }
  }

  async enableParser() {
    await getConvTable(this.isRoom).update({
      where: { id: this.convId },
      data: {
        preference: {
          parserEnabled: true,
        },
      },
    })
    await this.standardReply(
      `Congratulation, Super Parser has been activated!\nI can help you parse shared links, give me a try! 😄`,
      [
        "- I currently supports wxmp article, other media types (e.g. videos) are on the roadmap, hold on!",
        "- You can deactivate me via sending: `parser disable`.",
      ],
    )
  }

  async disableParser() {
    await getConvTable(this.isRoom).update({
      where: { id: this.convId },
      data: {
        preference: {
          parserEnabled: false,
        },
      },
    })
    await this.standardReply(
      `Okay, I'm going to take a break!\nFeel free to activate me again when you need me~ 👋🏻`,
      ["- You can activate me via sending: `parser enable`."],
    )
  }

  async safeParseCard({
    user,
    message,
  }: {
    user: IUserSummary
    message: {
      convId: string
      text: string
      id: string
      roomTopic?: string
      talkerName: string
    }
  }) {
    try {
      const url = parseUrlFromWechatUrlMessage(parseText(message.text))
      logger.info(`-- url in message: ${url}`)
      if (!url) return

      if (!isWxmpArticleUrl(url)) return

      const convPreference = await getConvPreference({
        convId: message.convId,
        isRoom: !!message.roomTopic,
      })
      if (!convPreference.parserEnabled) return

      initLogWithTimer()

      void this.notify(`parsing[${this.toParse}] mid=${message.id}`)
      ++this.toParse
      const card = await fetchWxmpArticleWithCache(url, {
        backendEngineType: convPreference.backend,
        summaryModel: convPreference.model,
      })
      // todo: dynamic sender with fixed card url

      logger.info(`-- parsing content`)
      if (!this.uniParser) this.uniParser = new CardSimulator()

      const cardContent = JSON.stringify(card)
      logger.info(`-- inputting: ${formatString(cardContent, 120)}`)
      const { cardUrl } = await this.uniParser.genCard(cardContent, user)

      logger.info(`-- sending file: ${cardUrl}`)

      const file = FileBox.fromUrl(cardUrl)
      void this.addTask(async () => this.conv?.say(file))
      void this.notify(`parsed mid=${message.id}`)
      logger.info("-- ✅ sent file")
    } catch (e) {
      const s = formatError(e)
      void this.notify(s)
    } finally {
      --this.toParse
    }
  }
}
