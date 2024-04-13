import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { getConvTable } from "../utils/get-conv-table"
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

  get _conv() {
    return this.message.conversation()
  }

  get _convId() {
    return this._conv.id
  }

  get _convTable() {
    return getConvTable(this.message)
  }

  async _getConvInDB() {
    return this._convTable.findUniqueOrThrow({
      where: {
        id: this._convId,
      },
    })
  }

  async _getConvPreference(): Promise<IWechatUserPreference | null> {
    return (await this._getConvInDB()).preference
  }

  async _getlang() {
    return (await this._getConvPreference())?.lang ?? "en"
  }

  async _getPretty(title: string, content: string, tips?: CommandType[]) {
    return await prettyBotQuery(title, content, tips, await this._getlang())
  }

  async standardReply(content: string, tips?: CommandType[]) {
    const pretty = await this._getPretty(this.title, content, tips)
    await this.message.say(pretty)
  }
}
