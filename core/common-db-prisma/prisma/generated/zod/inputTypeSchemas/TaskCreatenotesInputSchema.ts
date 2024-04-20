import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TaskCreatenotesInputSchema: z.ZodType<Prisma.TaskCreatenotesInput> = z.object({
  set: z.string().array()
}).strict();

export default TaskCreatenotesInputSchema;
