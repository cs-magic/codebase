import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';

export const WechatMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WechatMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WechatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => WechatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WechatMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WechatMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => WechatMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  talkerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  listenerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  timestamp: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mentionIdList: z.lazy(() => StringNullableListFilterSchema).optional(),
  filename: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default WechatMessageScalarWhereWithAggregatesInputSchema;
