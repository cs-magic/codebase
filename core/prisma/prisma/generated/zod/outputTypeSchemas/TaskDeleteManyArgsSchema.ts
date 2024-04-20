import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskWhereInputSchema } from '../inputTypeSchemas/TaskWhereInputSchema'

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export default TaskDeleteManyArgsSchema;
