import { z } from "zod"

export const todoCommands = z.union([
  z.literal("todo"),
  z.literal("list-todo"),
  z.literal("add-todo"),
  z.literal("update-todo"),
])
