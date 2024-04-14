import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';

export const WechatMessageScalarWhereInputSchema: z.ZodType<Prisma.WechatMessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WechatMessageScalarWhereInputSchema),z.lazy(() => WechatMessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatMessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatMessageScalarWhereInputSchema),z.lazy(() => WechatMessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  talkerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  listenerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mentionIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  filename: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default WechatMessageScalarWhereInputSchema;
