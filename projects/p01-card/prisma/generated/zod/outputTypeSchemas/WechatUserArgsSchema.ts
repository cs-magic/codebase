import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserSelectSchema } from '../inputTypeSchemas/WechatUserSelectSchema';
import { WechatUserIncludeSchema } from '../inputTypeSchemas/WechatUserIncludeSchema';

export const WechatUserArgsSchema: z.ZodType<Prisma.WechatUserDefaultArgs> = z.object({
  select: z.lazy(() => WechatUserSelectSchema).optional(),
  include: z.lazy(() => WechatUserIncludeSchema).optional(),
}).strict();

export default WechatUserArgsSchema;
