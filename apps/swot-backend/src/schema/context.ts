import { IWechatBotScan } from "@cs-magic/swot-bot/schema/bot.utils"
import { Wechaty } from "wechaty"
import { WebSocket } from "ws"

export interface IContext {
  bot: Wechaty | null
  scan: IWechatBotScan | null
  sockets: WebSocket[]
}
