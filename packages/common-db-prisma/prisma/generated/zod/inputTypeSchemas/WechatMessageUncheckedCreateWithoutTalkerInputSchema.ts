import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreatementionIdListInputSchema } from './WechatMessageCreatementionIdListInputSchema';

export const WechatMessageUncheckedCreateWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUncheckedCreateWithoutTalkerInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  listenerId: z.string().optional().nullable(),
  roomId: z.string().optional().nullable(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageCreatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.string().optional().nullable()
}).strict();

export default WechatMessageUncheckedCreateWithoutTalkerInputSchema;
