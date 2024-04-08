import { isWechatArticleUrl } from "@/core/card-platform/wechat-article/utils"
import { UniParser } from "@/core/download-card.action"
import { FileBox } from "file-box"
import { promises } from "fs"
import { types, Wechaty } from "wechaty"
import { MessageInterface } from "wechaty/impls"
import { initLog } from "../../../common-common/init-log"
import { parseCommands } from "../../../common-common/parse-commands"
import { parseUrlFromWechatUrlMessage } from "../../../common-common/parse-url-from-wechat-url-message"
import {
  BackendEngineType,
  supportedBackendEngineTypes,
} from "../../../common-common/schema"
import {
  LLMModelType,
  supportedLLMModelTypes,
} from "../../../common-llm/schema/models"
import { fetchWxmpArticle } from "../../wxmp-article/fetch-wxmp-article"
import { BaseMessageHandler } from "./_base"
import path from "path"
import Mustache from "mustache"

export class LinkParserMessageHandler extends BaseMessageHandler {
  private uniParser: UniParser
  private backendEngineType: BackendEngineType = "nodejs"
  private summaryModel: LLMModelType = "gpt-4"

  constructor(bot: Wechaty) {
    super(bot)
    this.uniParser = new UniParser()
  }

  async onMessage(message: MessageInterface): Promise<void> {
    initLog()

    const result = parseCommands(message.text(), [
      "parser-status",
      "set-backend-engine-type",
      "set-summary-model",
    ])

    const backendEngineType = this.backendEngineType
    const summaryModel = this.summaryModel

    if (result.command === "parser-status") {
      const template = await promises.readFile(
        path.join(__dirname, "../template.yml"),
        { encoding: "utf-8" },
      )
      const config = Mustache.render(template, {
        backendEngineType,
        summaryModel,
      })
      await message.say(config)
      return
    }

    // todo: interesting type hint
    // type PM = {
    //   backendEngineType: BackendEngineType
    //   summaryModel: LLMModelType
    // }
    // const setField = async <
    //   T extends keyof LinkParserMessageHandler & keyof PM,
    // >(
    //   field: T,
    //   vs: PM[T][],
    // ) => {
    //   const args = (result.args?.trim() ?? "") as PM[T]
    //   if ( vs.includes(args)) {
    //     this[field] = args
    //     await message.say("ok")
    //   } else {
    //     await message.say(
    //       `failed to change the ${result.command} into ${args}, the available is ${JSON.stringify(supportedBackendEngineTypes)}`,
    //     )
    //   }
    // }

    type B<T> = T extends "backendEngineType" ? BackendEngineType : LLMModelType

    const setField = async <T extends "summaryModel" | "backendEngineType">(
      field: T,
      vs: B<T>[],
    ) => {
      const args = (result.args?.trim() ?? "") as B<T>
      if (vs.includes(args)) {
        // Here we use a type assertion. Be cautious as this bypasses type safety.
        // @ts-ignore // todo
        this[field] = args
      } else {
        await message.say(
          `failed to change the ${result.command} into ${args}, the available is ${JSON.stringify(supportedBackendEngineTypes)}`,
        )
      }
    }

    if (result.command === "set-summary-model")
      return setField("summaryModel", supportedLLMModelTypes)

    if (result.command === "set-backend-engine-type")
      return setField("backendEngineType", supportedBackendEngineTypes)

    if (message.type() !== types.Message.Url) return

    const url = parseUrlFromWechatUrlMessage(message.text())
    console.log("-- url in message: ", url)
    if (!url) return

    if (!isWechatArticleUrl(url)) return

    const content = await fetchWxmpArticle(url, {
      backendEngineType,
      summaryModel,
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
