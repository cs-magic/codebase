import { Message } from "wechaty"

export const formatTalker = async (message: {
  talkerName: string
  roomTopic?: string
}) => {
  let s = message.talkerName
  if (message.roomTopic) {
    s += `@${message.roomTopic}`
  }
  return s
}

export const formatTalkerFromMessage = async (message: Message) =>
  formatTalker({
    talkerName: message.talker().name(),
    roomTopic: await message.room()?.topic(),
  })
