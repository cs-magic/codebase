import { z } from "zod";

export const TaskStatusSchemaRootProjectsP01Card = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
]);
