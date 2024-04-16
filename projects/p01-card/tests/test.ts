import { z } from "zod";

export const TaskStatusSchemaRootProjectsP01CardTests = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
]);
