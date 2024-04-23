export const parseUrlFromWechatUrlMessage = (text: string): string | null => {
  const m = /<url>(.*?)<\/url>/.exec(text)
  return m?.[1] ?? null
}
