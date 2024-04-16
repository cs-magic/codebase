import { z } from "zod";

export const TaskStatusSchema2 = z.enum([
  "pending",
  "running",
  "paused",
  "done",
  "discarded",
]);
