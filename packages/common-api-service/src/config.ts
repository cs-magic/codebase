import { z } from "zod"

export const botCommands = z.enum(["start", "stop", "state", "logout"])
