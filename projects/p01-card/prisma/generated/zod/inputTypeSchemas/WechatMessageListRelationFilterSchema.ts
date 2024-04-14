import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereInputSchema } from './WechatMessageWhereInputSchema';

export const WechatMessageListRelationFilterSchema: z.ZodType<Prisma.WechatMessageListRelationFilter> = z.object({
  every: z.lazy(() => WechatMessageWhereInputSchema).optional(),
  some: z.lazy(() => WechatMessageWhereInputSchema).optional(),
  none: z.lazy(() => WechatMessageWhereInputSchema).optional()
}).strict();

export default WechatMessageListRelationFilterSchema;
