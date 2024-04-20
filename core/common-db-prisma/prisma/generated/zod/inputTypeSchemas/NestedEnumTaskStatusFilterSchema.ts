import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';

export const NestedEnumTaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export default NestedEnumTaskStatusFilterSchema;
