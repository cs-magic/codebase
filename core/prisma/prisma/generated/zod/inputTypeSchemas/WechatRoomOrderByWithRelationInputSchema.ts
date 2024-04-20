import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WechatMessageOrderByRelationAggregateInputSchema } from './WechatMessageOrderByRelationAggregateInputSchema';
import { TaskOrderByRelationAggregateInputSchema } from './TaskOrderByRelationAggregateInputSchema';

export const WechatRoomOrderByWithRelationInputSchema: z.ZodType<Prisma.WechatRoomOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  adminIdList: z.lazy(() => SortOrderSchema).optional(),
  memberIdList: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  topic: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  preference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  data: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  messages: z.lazy(() => WechatMessageOrderByRelationAggregateInputSchema).optional(),
  Task: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional()
}).strict();

export default WechatRoomOrderByWithRelationInputSchema;
