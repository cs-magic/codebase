import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskWhereInputSchema } from '../inputTypeSchemas/TaskWhereInputSchema'
import { TaskOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TaskOrderByWithAggregationInputSchema'
import { TaskScalarFieldEnumSchema } from '../inputTypeSchemas/TaskScalarFieldEnumSchema'
import { TaskScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TaskScalarWhereWithAggregatesInputSchema'

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TaskGroupByArgsSchema;
