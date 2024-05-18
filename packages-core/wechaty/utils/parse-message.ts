import { deserializeRefMsgPayload } from "../../wechaty-puppet/ref-msg/desrialize"

export type PadlocalVersion = "raw@1.20" | "mark@2024-04-19"

export const padlocalVersion: PadlocalVersion = "mark@2024-04-19"

/**
 * 从 消息 中解析出被引用的数据
 *
 * @param messageText
 * @param version
 */
export const parseQuote = (
  messageText: string,
  version: PadlocalVersion = "mark@2024-04-19",
) => {
  const m = /^「(.*?)：(.*?)」\n- - - - - - - - - - - - - - -\n(.*)$/ms.exec(
    messageText,
  )

  if (!m) return null

  const deserialized = deserializeRefMsgPayload(m[2]!)
  return {
    userName: m[1]!,
    content: m[3]!,
    quoted:
      version === "mark@2024-04-19" && typeof deserialized === "object"
        ? { version, ...deserialized }
        : {
            version,
            content: m[2]!,
          },
  }
}
export const parseText = (messageText: string) => {
  const text = (
    parseQuote(messageText, padlocalVersion)?.content ?? messageText
  ).trim()
  // logger.debug("parseText: %o", { text, messageText })
  return text
}
