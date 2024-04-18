import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  priority: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskAvgOrderByAggregateInputSchema;
