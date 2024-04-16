import { formatString } from "@cs-magic/common/utils/format-string"
import { type Message } from "wechaty"

export const prettyMessage = (message: Message) => {
  const data = {
    ...message.payload,
    text: formatString(message.payload?.text ?? "", 30),
  }
  return JSON.stringify(data)
}
