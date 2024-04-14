import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreatementionIdListInputSchema } from './WechatMessageCreatementionIdListInputSchema';
import { WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema } from './WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema';
import { WechatRoomCreateNestedOneWithoutMessagesInputSchema } from './WechatRoomCreateNestedOneWithoutMessagesInputSchema';

export const WechatMessageCreateWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageCreateWithoutTalkerInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageCreatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.string().optional().nullable(),
  listener: z.lazy(() => WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema).optional(),
  room: z.lazy(() => WechatRoomCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default WechatMessageCreateWithoutTalkerInputSchema;
