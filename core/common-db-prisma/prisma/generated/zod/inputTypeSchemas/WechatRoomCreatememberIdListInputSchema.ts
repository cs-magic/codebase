import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WechatRoomCreatememberIdListInputSchema: z.ZodType<Prisma.WechatRoomCreatememberIdListInput> = z.object({
  set: z.string().array()
}).strict();

export default WechatRoomCreatememberIdListInputSchema;
