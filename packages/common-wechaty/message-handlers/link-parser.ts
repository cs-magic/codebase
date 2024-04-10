import { isWechatArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { CardSimulator } from "@/core/card-simulator"
import { FileBox } from "file-box"
import { types } from "wechaty"
import { MessageInterface } from "wechaty/impls"
import { fetchWxmpArticle } from "../../3rd-wechat/wxmp-article/fetch-wxmp-article"
import { initLog } from "../../common-common/init-log"
import { parseCommands } from "../../common-common/parse-commands"
import { parseUrlFromWechatUrlMessage } from "../../common-common/parse-url-from-wechat-url-message"
import { prettyError } from "../../common-common/pretty-error"
import {
  BackendEngineType,
  backendEngineTypeSchema,
} from "../../common-common/schema"
import {
  LLMModelType,
  llmModelTypeSchema,
} from "../../common-llm/schema/providers"
import { BaseMessageHandler } from "./_base"

export class LinkParserMessageHandler extends BaseMessageHandler<{
  backendEngineType: BackendEngineType
  summaryModel: LLMModelType
}> {
  private uniParser: CardSimulator | null = null

  async onMessage(message: MessageInterface): Promise<void> {
    initLog()

    const result = parseCommands(message.text(), [
      "/set-backend-engine-type",
      "/set-summary-model",
    ])

    switch (result.command) {
      case "/set-backend-engine-type":
        try {
          backendEngineTypeSchema.parse(result.args)
          this.context.backendEngineType = result.args as BackendEngineType
          await message.say("ok")
        } catch (err) {
          const s = prettyError(err)
          await message.say(`操作失败，原因：${s}`)
        }
        break

      case "/set-summary-model":
        try {
          llmModelTypeSchema.parse(result.args)
          this.context.summaryModel = result.args as LLMModelType
          await message.say("ok")
        } catch (err) {
          const s = prettyError(err)
          await message.say(`操作失败，原因：${s}`)
        }
        break
    }

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    console.log("-- url in message: ", url)
    if (!url) return

    if (!isWechatArticleUrl(url)) return

    const content = await fetchWxmpArticle(url, {
      backendEngineType: this.context.backendEngineType,
      summaryModel: this.context.summaryModel,
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
    if (!this.uniParser) this.uniParser = new CardSimulator()

    const cardContent = JSON.stringify(content)
    console.log(cardContent)
    const { cardUrl } = await this.uniParser.genCard(cardContent, user)

    console.log(`-- sending file: ${cardUrl}`)
    await message.say(FileBox.fromUrl(cardUrl))
    console.log("-- ✅ sent file")
  }
}
