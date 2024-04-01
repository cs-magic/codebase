/**
 * @param char one char
 */
export const isAscii = (char: string) => char.charCodeAt(0) <= 255

/**
 * ref: https://chat.openai.com/c/dde9c61c-5bb9-4c6b-8c6a-0cf8041f8b7a
 * @param char
 */
export function isChinese(char: string) {
  const charCode = char.charCodeAt(0)
  return (
    (charCode >= 0x4e00 && charCode <= 0x9fff) || // 基本汉字
    (charCode >= 0x3400 && charCode <= 0x4dbf) || // 扩展A
    (charCode >= 0x20000 && charCode <= 0x2a6df) || // 扩展B
    (charCode >= 0x2a700 && charCode <= 0x2b73f) || // 扩展C
    (charCode >= 0x2b740 && charCode <= 0x2b81f) || // 扩展D
    (charCode >= 0x2b820 && charCode <= 0x2ceaf) || // 扩展E
    (charCode >= 0x2ceb0 && charCode <= 0x2ebef) || // 扩展F
    (charCode >= 0x30000 && charCode <= 0x3134f) // 扩展G
  )
}

export const ELLIPSE = "…" // opt + ;
