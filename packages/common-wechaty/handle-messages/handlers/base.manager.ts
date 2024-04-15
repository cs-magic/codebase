import { type Message, type Wechaty } from "wechaty"
import { getBotContextFromMessage } from "../../utils/bot-context"
import { prettyBotQuery } from "../../utils/pretty-bot-query"
import { type CommandType } from "../_all"

export class BaseManager {
  public message: Message
  public bot: Wechaty
  public title: string

  constructor(bot: Wechaty, title: string, message: Message) {
    // todo: bot on message
    this.bot = bot
    this.title = title
    this.message = message
  }

  get botWxid() {
    return this.bot.wxid
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    return this.conv.id
  }

  async standardReply(content: string, tips?: CommandType[]) {
    const context = await getBotContextFromMessage(this.bot, this.message)
    const pretty = await prettyBotQuery(context, this.title, content, tips)
    await this.message.say(pretty)
  }
}
