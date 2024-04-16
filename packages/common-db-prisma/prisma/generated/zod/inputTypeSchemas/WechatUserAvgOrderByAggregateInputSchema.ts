import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WechatUserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WechatUserAvgOrderByAggregateInput> = z.object({
  gender: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WechatUserAvgOrderByAggregateInputSchema;
