import { last } from "lodash"
import { types } from "wechaty"
import yargsParser from "yargs-parser"

import { logger } from "@cs-magic/common"
import { safeCallLLM } from "@cs-magic/llm/utils/safe-call-llm"

import { BasePlugin } from "./base.plugin.js"

export class TestPlugin extends BasePlugin {
  async run(args: string) {
    const programme = yargsParser(args)

    if (programme._[0]?.toString().includes("recall-last-one"))
      await this.testRecallLastOne()

    if (programme._[0]?.toString().includes("reply-link"))
      await this.testReplyLink()

    if (programme._[0]?.toString().includes("describe-last-image"))
      await this.testDescribeLastImage()
  }

  async testDescribeLastImage() {
    const messages = await this.getLatestMessages()
    const lastImageInDB = last(
      messages.filter((m) => m.type === Number(types.Message.Image)),
    )
    if (!lastImageInDB) return logger.debug("no lastImageInDB")

    const lastImageInContext = await this.bot.Message.find({
      id: lastImageInDB.id,
    })
    if (!lastImageInContext) return logger.debug("no lastImageInContext")

    const image = await lastImageInContext.toFileBox()
    const result = await safeCallLLM({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "描述一下这张图里的内容",
            },
            {
              type: "image_url",
              image_url: {
                url: await image.toDataURL(),
              },
            },
          ],
        },
      ],
    })
    const content = result.response?.choices[0]?.message.content
    if (content) await this.reply(content)
  }

  async testReplyLink() {
    void this.reply(
      new this.bot.UrlLink({
        title:
          "自定义内容 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        description:
          "自定义摘要 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        url: "https://swot.cs-magic.cn",
        thumbnailUrl:
          "https://avatars.githubusercontent.com/u/33591398?s=80&v=4",
      }),
    )
  }

  async testRecallLastOne() {
    const messages = await this.getLatestMessages()
    const wxid = this.bot.context?.wxid
    logger.debug({ wxid })
    const lastBotMessageInDB = last(messages.filter((m) => m.talkerId === wxid))
    if (!lastBotMessageInDB) return logger.debug("no lastBotMessageInDB")

    const lastBotMessageInContext = await this.bot.Message.find({
      id: lastBotMessageInDB.id,
    })
    if (!lastBotMessageInContext)
      return logger.debug("no lastBotMessageInContext")

    await lastBotMessageInContext.recall()
  }
}
