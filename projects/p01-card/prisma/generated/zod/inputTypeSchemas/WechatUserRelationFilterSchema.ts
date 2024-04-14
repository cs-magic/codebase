import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const WechatUserRelationFilterSchema: z.ZodType<Prisma.WechatUserRelationFilter> = z.object({
  is: z.lazy(() => WechatUserWhereInputSchema).optional(),
  isNot: z.lazy(() => WechatUserWhereInputSchema).optional()
}).strict();

export default WechatUserRelationFilterSchema;
