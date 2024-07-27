import { IWechatBotTransfer } from "../../schema/index.js"
import { WebSocket } from "ws"

export const transferMessage = (
  data: IWechatBotTransfer,
  sockets: WebSocket[],
) => {
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
}
