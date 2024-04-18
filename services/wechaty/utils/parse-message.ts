export const parseQuote = (
  messageText: string,
): {
  userName: string
  quotedContent: string
  content: string
} | null => {
  // console.log({ message })

  const m = /^「(.*?)：(.*?)」\n- - - - - - - - - - - - - - -\n(.*)$/.exec(
    messageText,
  )

  return !m
    ? null
    : {
        userName: m[1]!,
        quotedContent: m[2]!,
        content: m[3]!,
      }
}
export const parseText = (messageText: string) =>
  (parseQuote(messageText)?.content ?? messageText).trim()
