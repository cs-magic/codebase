export const parseJsonSafe = <T>(s?: string): T | null => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return JSON.parse(s ?? "") as T
  } catch (e) {
    return null
  }
}
