import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreatementionIdListInputSchema } from './WechatMessageCreatementionIdListInputSchema';
import { WechatUserCreateNestedOneWithoutSentMessagesInputSchema } from './WechatUserCreateNestedOneWithoutSentMessagesInputSchema';
import { WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema } from './WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema';

export const WechatMessageCreateWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageCreateWithoutRoomInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageCreatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.string().optional().nullable(),
  talker: z.lazy(() => WechatUserCreateNestedOneWithoutSentMessagesInputSchema),
  listener: z.lazy(() => WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema).optional()
}).strict();

export default WechatMessageCreateWithoutRoomInputSchema;
