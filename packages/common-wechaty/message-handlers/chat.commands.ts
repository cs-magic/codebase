import { z } from "zod"

export const chatCommands = z.union([
  z.literal("enable-chat"),
  z.literal("disable-chat"),
  z.literal("list-topics"),
  z.literal("check-topic"),
  z.literal("new-topic"),
])
