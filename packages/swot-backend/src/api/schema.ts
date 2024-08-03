import { Wechaty } from "wechaty"
import { WebSocket } from "ws"
import { IWechatBotScan } from "../schema/index.js"

export interface IContext {
  bot: Wechaty | null
  scan: IWechatBotScan | null
  sockets: WebSocket[]
}
