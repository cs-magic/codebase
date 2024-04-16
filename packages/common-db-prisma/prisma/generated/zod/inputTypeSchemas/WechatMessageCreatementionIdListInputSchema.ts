import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WechatMessageCreatementionIdListInputSchema: z.ZodType<Prisma.WechatMessageCreatementionIdListInput> = z.object({
  set: z.string().array()
}).strict();

export default WechatMessageCreatementionIdListInputSchema;
