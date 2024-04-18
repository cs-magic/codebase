import { Message } from "wechaty"

export const formatTalker = async (message: Message) => {
  let s = `${message.talker().name()}`
  if (message.room()) {
    s += `@${await message.room()?.topic()}`
  }
  return s
}
