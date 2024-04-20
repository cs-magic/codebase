import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserCountOutputTypeSelectSchema } from './WechatUserCountOutputTypeSelectSchema';

export const WechatUserCountOutputTypeArgsSchema: z.ZodType<Prisma.WechatUserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WechatUserCountOutputTypeSelectSchema).nullish(),
}).strict();

export default WechatUserCountOutputTypeSelectSchema;
