import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageSelectSchema } from '../inputTypeSchemas/WechatMessageSelectSchema';
import { WechatMessageIncludeSchema } from '../inputTypeSchemas/WechatMessageIncludeSchema';

export const WechatMessageArgsSchema: z.ZodType<Prisma.WechatMessageDefaultArgs> = z.object({
  select: z.lazy(() => WechatMessageSelectSchema).optional(),
  include: z.lazy(() => WechatMessageIncludeSchema).optional(),
}).strict();

export default WechatMessageArgsSchema;
