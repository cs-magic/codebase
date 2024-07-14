import type {
  CompressLineFunction,
  CompressLinesFunction,
} from "../schema/utils.js"

export function compressContent(
  content: string,
  targetLen: number = 6000,
): string {
  const horizontalCompress = () => {
    const compressLine: CompressLineFunction = (line, ratio = 0.9) => {
      if (line.length < 20) {
        return line
      }
      const n = line.length
      return (
        line.substring(0, Math.floor((n * ratio) / 2)) +
        "……" +
        line.substring(Math.ceil(n * (1 - ratio / 2)))
      )
    }

    const compressLines: CompressLinesFunction = (lines) => {
      const n = Math.max(lines.length - 1, 1)
      return lines.map((line, i) =>
        compressLine(line, 0.4 + Math.abs(i / n - 0.5)),
      )
    }

    for (let i = 1; i <= 10; i++) {
      if (content.length <= targetLen) return
      const lines = content.split("\n")
      const chars1 = content.length
      content = compressLines(lines).join("\n")
      const chars2 = content.length
      console.debug(
        `[${i}] ${lines.length} lines, ${chars1} --> ${chars2}, ratio: ${((chars2 / chars1) * 100).toFixed(2)}%`,
      )
    }
  }

  const verticalCompress = () => {
    let i = 0
    while (content.length > targetLen) {
      const lines = content.split("\n")
      const k = lines.length >> 1
      lines.splice(k, 1)
      content = lines.join("\n")
      i++
      console.debug(
        `[${i}] ${lines.length} lines, dropped ${k}th line, current chars: ${content.length}`,
      )
    }
  }

  horizontalCompress()
  verticalCompress()
  return content
}
