import { Message } from "wechaty"
import { getConvPreference } from "../utils/get-conv-preference"
import { prettyBotQuery } from "../utils/pretty-bot-query"
import { CommandType } from "./_all"

export class BaseManager {
  public message: Message
  public _botWxid: string
  public title: string

  constructor(title: string, message: Message, botWxid: string) {
    this.title = title
    this.message = message
    this._botWxid = botWxid
  }

  get conv() {
    return this.message.conversation()
  }

  get convId() {
    return this.conv.id
  }

  async standardReply(content: string, tips?: CommandType[]) {
    const preference = await getConvPreference(this.message)

    const pretty = await prettyBotQuery(
      this.title,
      content,
      tips,
      preference.lang,
    )
    await this.message.say(pretty)
  }
}
