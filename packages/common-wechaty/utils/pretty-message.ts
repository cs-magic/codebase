import { Message } from "wechaty"
import { prettyString } from "../../common-common/pretty-string"

export const prettyMessage = (message: Message) => {
  const data = {
    ...message.payload,
    text: prettyString(message.payload?.text ?? "", 30),
  }
  return JSON.stringify(data)
}
