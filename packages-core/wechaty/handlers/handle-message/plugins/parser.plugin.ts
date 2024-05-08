import { formatError } from "@cs-magic/common/utils/format-error"
import { isWxmpArticleUrl } from "@cs-magic/common/utils/is-wxmp-article-url"
import {
  parseTitleFromWechatUrlMessage,
  parseUrlFromWechatUrlMessage,
} from "@cs-magic/common/utils/parse-url-from-wechat-url-message"
import { logger } from "@cs-magic/log/logger"
import { wxmpUrl2preview } from "@cs-magic/p01-common/wxmpUrl2preview"

import { IUserSummary } from "@cs-magic/prisma/schema/user.summary"
import { FileBox } from "file-box"
import { z } from "zod"
import { CardSimulator } from "../../../../../packages-to-classify/spider/card-simulator"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { getQuotedMessage } from "../../../utils/get-quoted-message"
import { parseText } from "../../../utils/parse-message"
import { BasePlugin } from "./base.plugin"

const commandTypeSchema = z.enum([""])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Super Parser",
    description:
      "Hello, I am the Super Parser!" +
      "\nI can parse almost anything!" +
      "\nSend me one wxmp article, now! 😠",
    commands: {},
  },
}

export class ParserPlugin extends BasePlugin {
  static name: FeatureType = "parser"
  static uniParser: CardSimulator | null = null
  static toParse = 0
  public i18n = i18n

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    await this.standardReply(
      desc,
      Object.keys(commands).map(
        (command) => `  ${ParserPlugin.name} ${command}`,
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

  async parseQuotedImage() {
    if (!this.quote || this.quote.quoted.version !== "mark@2024-04-19") return
    const id = this.quote.quoted.id
    if (!id) return
    const image = this.bot.Image.create(id)
    void this.reply(await image.hd())
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

      ++ParserPlugin.toParse
      const title = parseTitleFromWechatUrlMessage(text)
      void this.notify(
        `🌈 正在解析[${ParserPlugin.toParse}]: ${title}`,
        "parser",
      )

      if (!ParserPlugin.uniParser) ParserPlugin.uniParser = new CardSimulator()

      // todo: add userIdentity into parser
      const inner = await wxmpUrl2preview(
        url,
        convPreference.features.parser.options,
      )

      const { cardUrl } = await ParserPlugin.uniParser.genCard(
        JSON.stringify(inner),
        user,
      )
      logger.info(`-- sending file: ${cardUrl}`)

      const file = FileBox.fromUrl(cardUrl)
      void this.reply(file)
      void this.notify(`✅ 解析成功: ${title}`, "parser")
      logger.info("-- sent file")
    } catch (e) {
      const s = formatError(e)
      // todo: retry in inner logic
      void this.reply("解析失败，请再试一次吧！")
      void this.notify(`❌ ` + s, "parser")
    } finally {
      --ParserPlugin.toParse
    }
  }

  async quoteReply() {
    if (!this.quote || this.quote.quoted.version !== "mark@2024-04-19") return
    const id = this.quote.quoted.id
    if (!id) return

    logger.info("quoting reply")
    const post = await this.bot.Post.builder()
      .add("this is the reply to a quoted message")
      .build()

    await post.reply(this.message) // I'm thinking about to rename the `post.reply()` to `post.replyTo()` so that it will be less confusing.
    await this.bot.publish(post)

    logger.info("quoted reply")
  }
}
