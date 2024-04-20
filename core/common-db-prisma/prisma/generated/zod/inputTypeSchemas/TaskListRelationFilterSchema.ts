import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereInputSchema } from './TaskWhereInputSchema';

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export default TaskListRelationFilterSchema;
