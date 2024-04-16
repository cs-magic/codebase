import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { WechatUserOrderByWithRelationInputSchema } from './WechatUserOrderByWithRelationInputSchema';
import { WechatRoomOrderByWithRelationInputSchema } from './WechatRoomOrderByWithRelationInputSchema';

export const WechatMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.WechatMessageOrderByWithRelationInput> = z.object({
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
  talker: z.lazy(() => WechatUserOrderByWithRelationInputSchema).optional(),
  listener: z.lazy(() => WechatUserOrderByWithRelationInputSchema).optional(),
  room: z.lazy(() => WechatRoomOrderByWithRelationInputSchema).optional()
}).strict();

export default WechatMessageOrderByWithRelationInputSchema;
