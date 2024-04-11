import { Message } from "wechaty"

export const isTestMessage = async (message: Message) => {
  const room = message.room()
  const roomName = (await room?.topic()) ?? ""
  return /test/.exec(roomName)
}
