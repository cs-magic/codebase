import { z } from "zod"

export const botCommandTypeSchema = z.enum([
  "start",
  "stop",
  "state",
  "logout",
  "update-token",
])
export type BotCommandType = z.infer<typeof botCommandTypeSchema>
