import { type Message, type Wechaty } from "wechaty"
import { object } from "zod"
import { getBotContextFromMessage } from "../../utils/bot-context"
import { prettyBotQuery } from "../../utils/pretty-bot-query"
import { type CommandType } from "../_all"

export type ICommandData = Record<string, string>

export class BaseManager {
  public message: Message
  public bot: Wechaty
  public title: string
  public commandData: ICommandData

  constructor(
    bot: Wechaty,
    title: string,
    message: Message,
    commandData?: ICommandData,
  ) {
    // todo: bot on message
    this.bot = bot
    this.title = title
    this.message = message
    this.commandData = commandData ?? {}
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

  async help() {
    await this.standardReply(
      [
        ...Object.keys(this.commandData).map(
          (k) => `${k}: ${this.commandData[k]}`,
        ),
      ].join("\n"),
    )
  }
}
