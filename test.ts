import { z } from "zod"

export const TaskStatusSchemaRoot = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
])
