import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WechatRoomCountOrderByAggregateInputSchema } from './WechatRoomCountOrderByAggregateInputSchema';
import { WechatRoomMaxOrderByAggregateInputSchema } from './WechatRoomMaxOrderByAggregateInputSchema';
import { WechatRoomMinOrderByAggregateInputSchema } from './WechatRoomMinOrderByAggregateInputSchema';

export const WechatRoomOrderByWithAggregationInputSchema: z.ZodType<Prisma.WechatRoomOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  adminIdList: z.lazy(() => SortOrderSchema).optional(),
  memberIdList: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => WechatRoomCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WechatRoomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WechatRoomMinOrderByAggregateInputSchema).optional()
}).strict();

export default WechatRoomOrderByWithAggregationInputSchema;
