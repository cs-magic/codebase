import { type ZodEnum } from "zod"

export type IParseCommandRes<T extends string> = null | {
  command: T
  args: string
}

export const parseLimitedCommand = <T extends string>(
  text: string,
  commands: T[] | ZodEnum<[T, ...T[]]>,
  prefix = "",
): IParseCommandRes<T> => {
  const ms =
    commands instanceof Array ? commands : commands.options.map((o) => o)

  // 正则使用 `` 而非 // 的时候要 \s --> \\s
  // - /A, ok
  // - /A b, ok
  // - /Ab, not ok
  const m = new RegExp(`^${prefix}(${ms.join("|")})(?:\\s+(.*?))?\\s*$`).exec(
    text,
  )

  if (!m) return null

  const command = m[1] as T
  const args = (m[2] ?? "").trim()
  // logger.info({ text, command, args })
  return { command, args }
}
