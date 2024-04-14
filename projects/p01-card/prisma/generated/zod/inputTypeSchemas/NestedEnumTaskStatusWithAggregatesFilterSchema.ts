import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumTaskStatusFilterSchema } from './NestedEnumTaskStatusFilterSchema';

export const NestedEnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export default NestedEnumTaskStatusWithAggregatesFilterSchema;
