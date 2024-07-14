import { IWechatBotTransfer } from "@cs-magic/swot-bot"
import { WebSocket } from "ws"

export const transferMessage = (
  data: IWechatBotTransfer,
  sockets: WebSocket[],
) => {
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
}
