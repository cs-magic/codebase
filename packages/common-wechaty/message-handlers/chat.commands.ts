import { z } from "zod"

export const chatCommands = z.union([
  z.literal("enable-ai-chat"),
  z.literal("disable-ai-chat"),
  z.literal("list-topics"),
  z.literal("check-topic"),
  z.literal("new-topic"),
])
