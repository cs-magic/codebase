import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';

export const TaskCreateManyOwnerInputSchema: z.ZodType<Prisma.TaskCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional()
}).strict();

export default TaskCreateManyOwnerInputSchema;
