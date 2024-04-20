import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WechatMessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WechatMessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WechatMessageOrderByRelationAggregateInputSchema;
