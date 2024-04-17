import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { TaskCreatenotesInputSchema } from './TaskCreatenotesInputSchema';

export const TaskCreateWithoutOwnerInputSchema: z.ZodType<Prisma.TaskCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  notes: z.union([ z.lazy(() => TaskCreatenotesInputSchema),z.string().array() ]).optional(),
}).strict();

export default TaskCreateWithoutOwnerInputSchema;
