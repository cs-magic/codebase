import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { WechatUserRelationFilterSchema } from './WechatUserRelationFilterSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserNullableRelationFilterSchema } from './WechatUserNullableRelationFilterSchema';
import { WechatRoomNullableRelationFilterSchema } from './WechatRoomNullableRelationFilterSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const WechatMessageWhereInputSchema: z.ZodType<Prisma.WechatMessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WechatMessageWhereInputSchema),z.lazy(() => WechatMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatMessageWhereInputSchema),z.lazy(() => WechatMessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  talkerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  listenerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mentionIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  filename: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  talker: z.union([ z.lazy(() => WechatUserRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  listener: z.union([ z.lazy(() => WechatUserNullableRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional().nullable(),
  room: z.union([ z.lazy(() => WechatRoomNullableRelationFilterSchema),z.lazy(() => WechatRoomWhereInputSchema) ]).optional().nullable(),
}).strict();

export default WechatMessageWhereInputSchema;
