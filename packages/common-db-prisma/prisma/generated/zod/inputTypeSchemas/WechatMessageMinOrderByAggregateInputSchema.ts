import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const WechatMessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.WechatMessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  talkerId: z.lazy(() => SortOrderSchema).optional(),
  listenerId: z.lazy(() => SortOrderSchema).optional(),
  roomId: z.lazy(() => SortOrderSchema).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default WechatMessageMinOrderByAggregateInputSchema;
