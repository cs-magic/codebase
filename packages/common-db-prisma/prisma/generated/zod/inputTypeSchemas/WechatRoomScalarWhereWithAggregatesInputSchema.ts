import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const WechatRoomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WechatRoomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WechatRoomScalarWhereWithAggregatesInputSchema),z.lazy(() => WechatRoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatRoomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatRoomScalarWhereWithAggregatesInputSchema),z.lazy(() => WechatRoomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  adminIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  memberIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  topic: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  preference: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  data: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional()
}).strict();

export default WechatRoomScalarWhereWithAggregatesInputSchema;
