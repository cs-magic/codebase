import { z } from "zod"

export const TaskStatusSchemaRootProjects = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
])
