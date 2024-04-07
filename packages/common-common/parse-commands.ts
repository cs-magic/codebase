export type NormalCommand = "help" | "ding" | "status"
export const normalCommands = ["help", "ding", "status"] as NormalCommand[]

export type SuperCommand = "set-llm-model"
export const superCommands = ["set-llm-model"] as SuperCommand[]

export const parseCommands = <T extends string>(
  text: string,
  commands: T[],
): { command?: T; args?: string } => {
  const m = new RegExp(`^(${commands.join("|")})\s*(.*?)$`).exec(text)
  if (!m) return {}
  const command = m[1] as T
  const args = m[2]
  return { command, args }
}
