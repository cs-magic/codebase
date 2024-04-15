import { type Message } from "wechaty"

export const isSenderAdmin = (message: Message) =>
  message.talker().name().includes("南川")
