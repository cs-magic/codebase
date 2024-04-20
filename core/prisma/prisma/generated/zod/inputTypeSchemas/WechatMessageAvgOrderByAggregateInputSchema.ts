import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WechatMessageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WechatMessageAvgOrderByAggregateInput> = z.object({
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WechatMessageAvgOrderByAggregateInputSchema;
