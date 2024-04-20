import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const WechatRoomNullableRelationFilterSchema: z.ZodType<Prisma.WechatRoomNullableRelationFilter> = z.object({
  is: z.lazy(() => WechatRoomWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WechatRoomWhereInputSchema).optional().nullable()
}).strict();

export default WechatRoomNullableRelationFilterSchema;
