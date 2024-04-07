import { isWechatArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { UniParser } from "@/core/download-card.action"
import { FileBox } from "file-box"
import { types, Wechaty } from "wechaty"
import { MessageInterface } from "wechaty/impls"
import { initLog } from "../../../common-common/init-log"
import { parseUrlFromWechatUrlMessage } from "../../../common-common/parse-url-from-wechat-url-message"
import { fetchWxmpArticle } from "../../wxmp-article/fetch-wxmp-article"
import { BaseMessageHandler } from "./_base.mh"

export class LinkParserMessageHandler extends BaseMessageHandler {
  private uniParser: UniParser

  constructor(bot: Wechaty) {
    super(bot)
    this.uniParser = new UniParser()
  }

  async onMessage(message: MessageInterface): Promise<void> {
    initLog()

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    console.log("-- url in message: ", url)
    if (!url) return

    if (!isWechatArticleUrl(url)) return

    const content = await fetchWxmpArticle(url, {
      fetchEngine: "fastapi",
      // summary_model: "gpt-3.5-turbo",
      summary_model: "glm-4",
    })

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
    const { cardUrl } = await this.uniParser.genCard(
      JSON.stringify(content), // 需要文字形式
      user,
    )

    console.log("-- sending file")
    await message.say(FileBox.fromUrl(cardUrl))
    console.log("-- ✅ sent file")
  }
}
