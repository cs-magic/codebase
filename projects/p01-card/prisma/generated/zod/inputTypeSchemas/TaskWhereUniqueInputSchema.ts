import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereInputSchema } from './TaskWhereInputSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { EnumTaskStatusFilterSchema } from './EnumTaskStatusFilterSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { WechatUserNullableRelationFilterSchema } from './WechatUserNullableRelationFilterSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  ownerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  owner: z.union([ z.lazy(() => WechatUserNullableRelationFilterSchema),z.lazy(() => WechatUserWhereInputSchema) ]).optional().nullable(),
}).strict());

export default TaskWhereUniqueInputSchema;
