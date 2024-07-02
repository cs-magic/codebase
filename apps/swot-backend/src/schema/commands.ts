import { z } from "zod"

export const botCommandTypeSchema = z.enum([
  "start",
  "stop",
  "state",
  "logout",
  "update-token",
  "get-preference",
  "set-preference",
  "get-contacts",
])
export type BotCommandType = z.infer<typeof botCommandTypeSchema>
