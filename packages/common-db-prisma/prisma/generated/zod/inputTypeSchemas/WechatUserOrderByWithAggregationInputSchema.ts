import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WechatUserCountOrderByAggregateInputSchema } from './WechatUserCountOrderByAggregateInputSchema';
import { WechatUserAvgOrderByAggregateInputSchema } from './WechatUserAvgOrderByAggregateInputSchema';
import { WechatUserMaxOrderByAggregateInputSchema } from './WechatUserMaxOrderByAggregateInputSchema';
import { WechatUserMinOrderByAggregateInputSchema } from './WechatUserMinOrderByAggregateInputSchema';
import { WechatUserSumOrderByAggregateInputSchema } from './WechatUserSumOrderByAggregateInputSchema';

export const WechatUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.WechatUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  friend: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weixin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alias: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  province: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  signature: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  preference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WechatUserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WechatUserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WechatUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WechatUserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WechatUserSumOrderByAggregateInputSchema).optional()
}).strict();

export default WechatUserOrderByWithAggregationInputSchema;
