export const parseCommand = <T extends string>(
  text: string,
  commands: T[],
): { command?: T; args?: string } => {
  // 正则使用 `` 而非 // 的时候要 \s --> \\s
  const m = new RegExp(`^/(${commands.join("|")})\\s*(.*?)\\s*$`).exec(text)

  if (!m) return {}

  const command = m[1] as T
  const args = m[2]
  console.log({ text, command, args })
  return { command, args }
}
