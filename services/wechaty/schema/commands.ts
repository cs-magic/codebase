import { z } from "zod"
import { basicCommands } from "./basic.commands"
import { chatCommands } from "./chat.commands"
import { parserCommands } from "./parser.commands"
import { todoCommands } from "./todo.commands"

export const featureTypeSchema = z.enum([
  "",
  "basic",
  "todo",
  "chatter",
  "parser",
])
export type FeatureType = z.infer<typeof featureTypeSchema>

export const commandsSchema = z.enum([
  ...basicCommands.options,
  ...chatCommands.options,
  ...parserCommands.options,
  ...todoCommands.options,
])
export type CommandType = z.infer<typeof commandsSchema>
