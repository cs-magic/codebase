import { deserializeRefMsgPayload } from "@cs-magic/wechaty-puppet-padlocal"

export type PadlocalVersion = "raw@1.20" | "mark@2024-04-19"

export const padlocalVersion: PadlocalVersion = "mark@2024-04-19"

export const parseQuote = (
  messageText: string,
  version: PadlocalVersion = "mark@2024-04-19",
) => {
  const m = /^「(.*?)：(.*?)」\n- - - - - - - - - - - - - - -\n(.*)$/.exec(
    messageText,
  )

  return !m
    ? null
    : {
        userName: m[1]!,
        content: m[3]!,
        quoted:
          version === "raw@1.20"
            ? {
                version,
                content: m[2]!,
              }
            : {
                version,
                ...deserializeRefMsgPayload(m[2]!),
              },
      }
}
export const parseText = (messageText: string) =>
  (parseQuote(messageText, padlocalVersion)?.content ?? messageText).trim()
