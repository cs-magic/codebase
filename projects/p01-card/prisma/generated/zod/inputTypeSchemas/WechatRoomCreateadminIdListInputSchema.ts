import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WechatRoomCreateadminIdListInputSchema: z.ZodType<Prisma.WechatRoomCreateadminIdListInput> = z.object({
  set: z.string().array()
}).strict();

export default WechatRoomCreateadminIdListInputSchema;
