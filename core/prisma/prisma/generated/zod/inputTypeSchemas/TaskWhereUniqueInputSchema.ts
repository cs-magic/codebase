import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereInputSchema } from './TaskWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumTaskStatusFilterSchema } from './EnumTaskStatusFilterSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { WechatUserNullableRelationFilterSchema } from './WechatUserNullableRelationFilterSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatRoomNullableRelationFilterSchema } from './WechatRoomNullableRelationFilterSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roomId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  notes: z.lazy(() => StringNullableListFilterSchema).optional(),
  priority: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  timer: z.lazy(() => JsonNullableFilterSchema).optional(),
  owner: z.union([ z.lazy(() => WechatUserNullableRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional().nullable(),
  room: z.union([ z.lazy(() => WechatRoomNullableRelationFilterSchema),z.lazy(() => WechatRoomWhereInputSchema) ]).optional().nullable(),
}).strict());

export default TaskWhereUniqueInputSchema;
