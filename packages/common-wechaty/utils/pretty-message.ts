import { prettyString } from "packages/common-common/utils/pretty-string"
import { type Message } from "wechaty"

export const prettyMessage = (message: Message) => {
  const data = {
    ...message.payload,
    text: prettyString(message.payload?.text ?? "", 30),
  }
  return JSON.stringify(data)
}
