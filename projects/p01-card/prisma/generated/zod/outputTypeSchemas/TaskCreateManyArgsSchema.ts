import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskCreateManyInputSchema } from '../inputTypeSchemas/TaskCreateManyInputSchema'

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default TaskCreateManyArgsSchema;
