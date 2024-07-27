import { IWechatBotScan } from "../../schema/index.js"
import { Wechaty } from "wechaty"
import { WebSocket } from "ws"

export interface IContext {
  bot: Wechaty | null
  scan: IWechatBotScan | null
  sockets: WebSocket[]
}
