import { formatString } from "@cs-magic/common/utils/format-string"
import { type Message } from "wechaty"

export const formatWechatyMessage = (message: Message, n = 120) => {
  const data = {
    ...message.payload,
    text: formatString(message.payload?.text ?? "", n),
  }
  return data
}
