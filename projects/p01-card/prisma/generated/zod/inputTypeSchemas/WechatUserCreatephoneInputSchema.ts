import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const WechatUserCreatephoneInputSchema: z.ZodType<Prisma.WechatUserCreatephoneInput> = z.object({
  set: z.string().array()
}).strict();

export default WechatUserCreatephoneInputSchema;
