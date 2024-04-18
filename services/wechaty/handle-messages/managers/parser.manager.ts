import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { formatError } from "@cs-magic/common/utils/format-error"
import { initLogWithTimer } from "@cs-magic/common/utils/init-log-with-timer"
import { isWxmpArticleUrl } from "@cs-magic/common/utils/is-wxmp-article-url"
import { parseUrlFromWechatUrlMessage } from "@cs-magic/common/utils/parse-url-from-wechat-url-message"
import { logger } from "@cs-magic/log/logger"
import { FileBox } from "file-box"
import { Message, types } from "wechaty"
import { z } from "zod"
import { fetchWxmpArticleWithCache } from "../../../../packages/3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { CardSimulator } from "../../../../packages/common-spider/card-simulator"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getConvTable } from "../../utils/get-conv-table"
import { parseLimitedCommand } from "../../utils/parse-command"
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
    await getConvTable(this.message).update({
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
    await getConvTable(this.message).update({
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

  async safeParseCard() {
    const message = this.message

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    logger.info(`-- url in message: ${url}`)
    if (!url) return

    if (!isWxmpArticleUrl(url)) return

    const preference = await getConvPreference(message)
    if (!preference.parserEnabled) return

    initLogWithTimer()

    const notificationGroups = await this.bot.Room.find({
      topic: /bot notification/i,
    })
    if (notificationGroups) {
      const formatTalker = async (message: Message) => {
        let s = `${message.talker().name()}`
        if (message.room()) {
          s += `@${await message.room()?.topic()}`
        }
        return s
      }
      void this.bot.sendQueue.addTask(async () =>
        notificationGroups.say(
          `[parser(${this.toParse})] parsing link from ${await formatTalker(message)}`,
        ),
      )
      void this.bot.sendQueue.addTask(() => message.forward(notificationGroups))
    }
    ++this.toParse

    try {
      const card = await fetchWxmpArticleWithCache(url, {
        backendEngineType: preference.backend,
        summaryModel: preference.model,
      })
      // todo: dynamic sender with fixed card url
      // let cardUrl = card.ossUrl
      const sender = message.talker()

      // avatar 在 padLocal 下是带domain的；web下不稳定
      const image = sender.payload?.avatar
      const user = image
        ? {
            id: sender.id,
            name: sender.name(),
            image,
          }
        : undefined

      logger.info(`-- parsing content`)
      if (!this.uniParser) this.uniParser = new CardSimulator()

      const cardContent = JSON.stringify(card)
      logger.info(cardContent)
      const { cardUrl } = await this.uniParser.genCard(cardContent, user)

      logger.info(`-- sending file: ${cardUrl}`)

      const file = FileBox.fromUrl(cardUrl)
      void this.bot.sendQueue.addTask(() => message.say(file))
      if (notificationGroups)
        void this.bot.sendQueue.addTask(() => notificationGroups.say(file))
      logger.info("-- ✅ sent file")
    } catch (e) {
      const s = formatError(e)
      void this.bot.sendQueue.addTask(() => message.say(s))
    } finally {
      --this.toParse
    }
  }
}
