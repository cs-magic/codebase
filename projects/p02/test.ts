import { z } from "zod"

export const TaskStatusSchemaRootProjectsP02 = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
])
