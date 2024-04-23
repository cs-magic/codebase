export const parseJs = <T = any>(s?: string): T | null => {
  try {
    return eval(`( ${s} )`) as T
  } catch (e) {
    // console.error(`failed to parse js from: ${s}`)
    return null
  }
}

export const parseJson = <T = any>(s?: string): T | null => {
  try {
    return JSON.parse(s ?? "") as T
  } catch (e) {
    // console.error(`failed to parse js from: ${s}`)
    return null
  }
}
