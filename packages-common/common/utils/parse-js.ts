export const parseJs = <T>(s?: string): T | null => {
  try {
    return eval(`(${s})`) as T
  } catch (e) {
    // console.error(`failed to parse js from: ${s}`)
    return null
  }
}

export const jsParse = parseJs
