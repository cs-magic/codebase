import { isWxmpArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { CardSimulator } from "@/core/card-simulator"
import { FileBox } from "file-box"
import { types } from "wechaty"
import { MessageInterface } from "wechaty/impls"
import { fetchWxmpArticleWithCache } from "../../3rd-wechat/wxmp-article/fetch-wxmp-article-with-cache"
import { initLog } from "../../common-common/init-log"
import { parseUrlFromWechatUrlMessage } from "../../common-common/parse-url-from-wechat-url-message"

import { BackendEngineType } from "../../common-llm/schema/llm"
import { LlmModelType } from "../../common-llm/schema/providers"

import { isTestMessage } from "../is-test-message"
import { BaseMessageHandler } from "./_base"

export class LinkParserMessageHandler extends BaseMessageHandler<{
  backendEngineType: BackendEngineType
  summaryModel: LlmModelType
}> {
  name = "link-parser"

  private uniParser: CardSimulator | null = null

  async onMessage(message: MessageInterface): Promise<void> {
    if (!(await isTestMessage(message))) return

    initLog()

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    console.log("-- url in message: ", url)
    if (!url) return

    if (!isWxmpArticleUrl(url)) return

    await message.say("正在解析……")

    const card = await fetchWxmpArticleWithCache(url, {
      backendEngineType: this.context.backendEngineType,
      summaryModel: this.context.summaryModel,
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
