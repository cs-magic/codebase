import { deserializeMsg } from "../../wechaty-puppet/msg/deserialize"
import { puppetVersion } from "../../wechaty-puppet/version"

export const parseText = (messageText: string) => {
  const text = (
    deserializeMsg(messageText, puppetVersion)?.content ?? messageText
  ).trim()
  // logger.debug("parseText: %o", { text, messageText })
  return text
}
