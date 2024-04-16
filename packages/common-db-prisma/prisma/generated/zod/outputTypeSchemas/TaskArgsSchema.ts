import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskSelectSchema } from '../inputTypeSchemas/TaskSelectSchema';
import { TaskIncludeSchema } from '../inputTypeSchemas/TaskIncludeSchema';

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export default TaskArgsSchema;
