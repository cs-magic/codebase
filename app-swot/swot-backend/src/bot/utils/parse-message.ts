import { deserializeMsg, puppetVersion } from "wechaty-puppet"

export const parseText = (messageText: string) => {
  const text = (
    deserializeMsg(messageText, puppetVersion)?.content ?? messageText
  ).trim()
  // logger.debug("parseText: %o", { text, messageText })
  return text
}
