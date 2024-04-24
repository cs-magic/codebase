export const parseUrlFromWechatUrlMessage = (text: string): string | null => {
  const m = /<url>(.*?)<\/url>/.exec(text)
  return m?.[1] ?? null
}

export const parseTitleFromWechatUrlMessage = (text: string): string | null => {
  const m = /<title>(.*?)<\/title>/.exec(text)
  return m?.[1] ?? null
}
