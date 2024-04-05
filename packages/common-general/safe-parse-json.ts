export const safeParseJson = (s?: any) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return JSON.parse(s)
  } catch (e) {
    return s
  }
}
