import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const WechatUserNullableRelationFilterSchema: z.ZodType<Prisma.WechatUserNullableRelationFilter> = z.object({
  is: z.lazy(() => WechatUserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WechatUserWhereInputSchema).optional().nullable()
}).strict();

export default WechatUserNullableRelationFilterSchema;
