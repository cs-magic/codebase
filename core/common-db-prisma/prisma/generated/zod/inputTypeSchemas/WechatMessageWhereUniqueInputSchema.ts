import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereInputSchema } from './WechatMessageWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { WechatUserRelationFilterSchema } from './WechatUserRelationFilterSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserNullableRelationFilterSchema } from './WechatUserNullableRelationFilterSchema';
import { WechatRoomNullableRelationFilterSchema } from './WechatRoomNullableRelationFilterSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const WechatMessageWhereUniqueInputSchema: z.ZodType<Prisma.WechatMessageWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => WechatMessageWhereInputSchema),z.lazy(() => WechatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatMessageWhereInputSchema),z.lazy(() => WechatMessageWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  talkerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  listenerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mentionIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  filename: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  talker: z.union([ z.lazy(() => WechatUserRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  listener: z.union([ z.lazy(() => WechatUserNullableRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional().nullable(),
  room: z.union([ z.lazy(() => WechatRoomNullableRelationFilterSchema),z.lazy(() => WechatRoomWhereInputSchema) ]).optional().nullable(),
}).strict());

export default WechatMessageWhereUniqueInputSchema;
