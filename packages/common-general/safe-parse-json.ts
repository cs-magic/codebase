export const safeParseJson = (s?: any) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return JSON.parse(s)
  } catch (e) {
    return s
  }
}

export const parseJS = <T = any>(s?: string) => {
  try {
    return eval(`( ${s} )`) as T
  } catch (e) {
    console.error(`failed to parse js from: ${s}`)
    return null
  }
}
