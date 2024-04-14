import { z } from "zod"

export const parserCommands = z.enum(["enable-parser", "disable-parser"])
