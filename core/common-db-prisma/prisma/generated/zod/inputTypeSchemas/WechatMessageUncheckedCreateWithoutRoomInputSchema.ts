import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreatementionIdListInputSchema } from './WechatMessageCreatementionIdListInputSchema';

export const WechatMessageUncheckedCreateWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageUncheckedCreateWithoutRoomInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  talkerId: z.string(),
  listenerId: z.string().optional().nullable(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageCreatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.string().optional().nullable()
}).strict();

export default WechatMessageUncheckedCreateWithoutRoomInputSchema;
