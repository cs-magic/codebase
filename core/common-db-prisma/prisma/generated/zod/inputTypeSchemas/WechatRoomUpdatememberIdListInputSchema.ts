import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WechatRoomUpdatememberIdListInputSchema: z.ZodType<Prisma.WechatRoomUpdatememberIdListInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export default WechatRoomUpdatememberIdListInputSchema;
