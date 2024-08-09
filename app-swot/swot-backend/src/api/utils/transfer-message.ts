import { WebSocket } from "ws"

import { IWechatBotTransfer } from "../../schema/index.js"

export const transferMessage = (
  data: IWechatBotTransfer,
  sockets: WebSocket[],
) => {
  sockets.forEach((socket) => {
    socket.send(JSON.stringify(data))
  })
}
