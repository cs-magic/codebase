import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  priority: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskSumOrderByAggregateInputSchema;
