import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreatementionIdListInputSchema } from './WechatMessageCreatementionIdListInputSchema';
import { WechatUserCreateNestedOneWithoutSentMessagesInputSchema } from './WechatUserCreateNestedOneWithoutSentMessagesInputSchema';
import { WechatRoomCreateNestedOneWithoutMessagesInputSchema } from './WechatRoomCreateNestedOneWithoutMessagesInputSchema';

export const WechatMessageCreateWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageCreateWithoutListenerInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageCreatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.string().optional().nullable(),
  talker: z.lazy(() => WechatUserCreateNestedOneWithoutSentMessagesInputSchema),
  room: z.lazy(() => WechatRoomCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default WechatMessageCreateWithoutListenerInputSchema;
