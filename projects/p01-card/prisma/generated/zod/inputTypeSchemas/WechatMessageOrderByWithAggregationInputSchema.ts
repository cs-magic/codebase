import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WechatMessageCountOrderByAggregateInputSchema } from './WechatMessageCountOrderByAggregateInputSchema';
import { WechatMessageAvgOrderByAggregateInputSchema } from './WechatMessageAvgOrderByAggregateInputSchema';
import { WechatMessageMaxOrderByAggregateInputSchema } from './WechatMessageMaxOrderByAggregateInputSchema';
import { WechatMessageMinOrderByAggregateInputSchema } from './WechatMessageMinOrderByAggregateInputSchema';
import { WechatMessageSumOrderByAggregateInputSchema } from './WechatMessageSumOrderByAggregateInputSchema';

export const WechatMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.WechatMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  talkerId: z.lazy(() => SortOrderSchema).optional(),
  listenerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roomId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  timestamp: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  text: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mentionIdList: z.lazy(() => SortOrderSchema).optional(),
  filename: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WechatMessageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WechatMessageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WechatMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WechatMessageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WechatMessageSumOrderByAggregateInputSchema).optional()
}).strict();

export default WechatMessageOrderByWithAggregationInputSchema;
