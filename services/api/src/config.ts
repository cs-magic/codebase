import { z } from "zod"

export const botCommandTypeSchema = z.enum(["start", "stop", "state", "logout"])
export type BotCommandType = z.infer<typeof botCommandTypeSchema>
