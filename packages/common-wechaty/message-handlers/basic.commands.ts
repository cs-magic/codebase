import { z } from "zod"

export const basicCommands = z.enum([
  "",
  "ding",
  "help",
  "status",
  "list-models",
  "set-model",
  "set-backend",
  "set-lang",
])
