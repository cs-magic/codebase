import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WechatUserSumOrderByAggregateInputSchema: z.ZodType<Prisma.WechatUserSumOrderByAggregateInput> = z.object({
  gender: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WechatUserSumOrderByAggregateInputSchema;
