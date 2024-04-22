export const parseJsonSafe = <T>(s?: any): T | null => {
  if (!s) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return JSON.parse(s) as T
  } catch (e) {
    return null
  }
}
