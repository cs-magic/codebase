import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskCreatenotesInputSchema } from './TaskCreatenotesInputSchema';

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  ownerId: z.string().optional().nullable(),
  notes: z.union([ z.lazy(() => TaskCreatenotesInputSchema),z.string().array() ]).optional(),
}).strict();

export default TaskCreateManyInputSchema;
