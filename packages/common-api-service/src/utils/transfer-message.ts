import { IWechatBotTransfer } from "@cs-magic/wechaty/schema"
import { WebSocket } from "ws"

export const transferMessage = (
  data: IWechatBotTransfer,
  sockets: WebSocket[],
) => {
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
}
