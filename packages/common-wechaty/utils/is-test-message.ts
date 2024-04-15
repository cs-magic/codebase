import { type Message } from "wechaty"

export const isTestMessage = async (message: Message) => {
  const room = message.room()
  const roomName = (await room?.topic()) ?? ""
  return /test|🤔 P01 prompt 工程师/.exec(roomName)
}
