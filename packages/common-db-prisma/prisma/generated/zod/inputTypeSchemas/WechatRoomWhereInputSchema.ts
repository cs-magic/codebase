import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { WechatMessageListRelationFilterSchema } from './WechatMessageListRelationFilterSchema';

export const WechatRoomWhereInputSchema: z.ZodType<Prisma.WechatRoomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WechatRoomWhereInputSchema),z.lazy(() => WechatRoomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatRoomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatRoomWhereInputSchema),z.lazy(() => WechatRoomWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  adminIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  memberIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  topic: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  preference: z.lazy(() => JsonNullableFilterSchema).optional(),
  data: z.lazy(() => JsonNullableFilterSchema).optional(),
  messages: z.lazy(() => WechatMessageListRelationFilterSchema).optional()
}).strict();

export default WechatRoomWhereInputSchema;
