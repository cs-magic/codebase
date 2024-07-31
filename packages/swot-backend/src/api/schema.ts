import { Wechaty } from "wechaty"
import { WebSocket } from "ws"
import { IWechatBotScan } from "../schema"

export interface IContext {
  bot: Wechaty | null
  scan: IWechatBotScan | null
  sockets: WebSocket[]
}
