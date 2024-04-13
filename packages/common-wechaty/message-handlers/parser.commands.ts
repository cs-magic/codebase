import { z } from "zod"

export const parserCommands = z.union([
  z.literal("enable-parser"),
  z.literal("disable-parser"),
])
