import { isWxmpArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { CardSimulator } from "@/core/card-simulator"
import { Prisma } from "@prisma/client"
import { FileBox } from "file-box"
import { types } from "wechaty"
import { type MessageInterface } from "wechaty/impls"
import { z } from "zod"
import { fetchWxmpArticleWithCache } from "../../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { initLog } from "../../common-common/init-log"
import { parseUrlFromWechatUrlMessage } from "../../common-common/parse-url-from-wechat-url-message"
import { prisma } from "../../common-db/providers/prisma"
import { getConv } from "../utils/get-conv"
import { getTalkerPreference } from "../utils/get-talker-preference"
import { BaseMessageHandler } from "./_base"
import { parseCommand } from "../utils/parse-command"

export const uniParserSchema = z.union([
  z.literal("enable-uni-parser"),
  z.literal("disable-uni-parser"),
])

export class UniParserMessageHandler extends BaseMessageHandler {
  private uniParser: CardSimulator | null = null

  async onMessage(message: MessageInterface): Promise<void> {
    const result = parseCommand<z.infer<typeof uniParserSchema>>(
      message.text(),
      uniParserSchema,
    )

    if (result) {
      const table = prisma[
        message.room() ? "wechatRoom" : "wechatUser"
      ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate

      const convId = message.conversation().id

      switch (result.command) {
        case "enable-uni-parser":
          await table.update({
            where: { id: convId },
            data: {
              uniParserEnabled: true,
            },
          })
          await message.say(
            this.bot.prettyQuery(
              "万能解析器",
              `万能解析器已启动，请发送一篇公众号文章让我解析吧！`,
              ["/disable-uni-parser: 停用万能解析器"].join("\n"),
            ),
          )
          break

        case "disable-uni-parser":
          await table.update({
            where: { id: convId },
            data: {
              uniParserEnabled: false,
            },
          })
          await message.say(
            this.bot.prettyQuery(
              "万能解析器",
              `万能解析器已关闭`,
              ["/enable-uni-parser: 启用万能解析器"].join("\n"),
            ),
          )
          break
      }

      return
    }

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    console.log("-- url in message: ", url)
    if (!url) return

    if (!isWxmpArticleUrl(url)) return

    const conv = await getConv(message)
    if (!conv?.uniParserEnabled) return

    initLog()

    await message.say("正在解析……")

    const talkerPreference = await getTalkerPreference(message)

    const card = await fetchWxmpArticleWithCache(url, {
      backendEngineType: talkerPreference?.backend,
      summaryModel: talkerPreference?.model,
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

    console.log(`-- parsing content`)
    if (!this.uniParser) this.uniParser = new CardSimulator()

    const cardContent = JSON.stringify(card)
    console.log(cardContent)
    const { cardUrl } = await this.uniParser.genCard(cardContent, user)

    console.log(`-- sending file: ${cardUrl}`)

    await message.say(FileBox.fromUrl(cardUrl))
    console.log("-- ✅ sent file")
  }
}
