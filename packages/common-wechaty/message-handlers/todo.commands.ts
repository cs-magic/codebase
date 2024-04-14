import { z } from "zod"

export const todoCommands = z.enum([
  "todo",
  "list-todo",
  "add-todo",
  "update-todo",
])
