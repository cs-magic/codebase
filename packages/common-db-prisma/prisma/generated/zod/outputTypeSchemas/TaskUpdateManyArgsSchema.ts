import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskUpdateManyMutationInputSchema } from '../inputTypeSchemas/TaskUpdateManyMutationInputSchema'
import { TaskUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TaskUncheckedUpdateManyInputSchema'
import { TaskWhereInputSchema } from '../inputTypeSchemas/TaskWhereInputSchema'

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
}).strict() ;

export default TaskUpdateManyArgsSchema;
