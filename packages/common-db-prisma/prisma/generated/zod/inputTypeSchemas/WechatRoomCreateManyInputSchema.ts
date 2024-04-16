import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateadminIdListInputSchema } from './WechatRoomCreateadminIdListInputSchema';
import { WechatRoomCreatememberIdListInputSchema } from './WechatRoomCreatememberIdListInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const WechatRoomCreateManyInputSchema: z.ZodType<Prisma.WechatRoomCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  adminIdList: z.union([ z.lazy(() => WechatRoomCreateadminIdListInputSchema),z.string().array() ]).optional(),
  memberIdList: z.union([ z.lazy(() => WechatRoomCreatememberIdListInputSchema),z.string().array() ]).optional(),
  avatar: z.string().optional().nullable(),
  topic: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  preference: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
}).strict();

export default WechatRoomCreateManyInputSchema;
