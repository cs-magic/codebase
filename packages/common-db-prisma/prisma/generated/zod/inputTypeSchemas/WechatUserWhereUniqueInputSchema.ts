import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { WechatMessageListRelationFilterSchema } from './WechatMessageListRelationFilterSchema';
import { TaskListRelationFilterSchema } from './TaskListRelationFilterSchema';

export const WechatUserWhereUniqueInputSchema: z.ZodType<Prisma.WechatUserWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => WechatUserWhereInputSchema),z.lazy(() => WechatUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatUserWhereInputSchema),z.lazy(() => WechatUserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  friend: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  type: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  weixin: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alias: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  province: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  signature: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.lazy(() => StringNullableListFilterSchema).optional(),
  preference: z.lazy(() => JsonNullableFilterSchema).optional(),
  data: z.lazy(() => JsonNullableFilterSchema).optional(),
  sentMessages: z.lazy(() => WechatMessageListRelationFilterSchema).optional(),
  receivedMessages: z.lazy(() => WechatMessageListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional()
}).strict());

export default WechatUserWhereUniqueInputSchema;
