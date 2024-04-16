import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskWhereInputSchema } from '../inputTypeSchemas/TaskWhereInputSchema'
import { TaskOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskOrderByWithRelationInputSchema'
import { TaskWhereUniqueInputSchema } from '../inputTypeSchemas/TaskWhereUniqueInputSchema'

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TaskAggregateArgsSchema;
