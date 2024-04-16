import { z } from "zod"
import { basicCommands } from "./basic.commands"
import { chatCommands } from "./chat.commands"
import { parserCommands } from "./parser.commands"
import { todoCommands } from "./todo.commands"

export const commandsSchema = z.enum([
  ...basicCommands.options,
  ...chatCommands.options,
  ...parserCommands.options,
  ...todoCommands.options,
])
export type CommandType = z.infer<typeof commandsSchema>
