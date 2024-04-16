import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskScalarWhereInputSchema } from './TaskScalarWhereInputSchema';
import { TaskUpdateManyMutationInputSchema } from './TaskUpdateManyMutationInputSchema';
import { TaskUncheckedUpdateManyWithoutOwnerInputSchema } from './TaskUncheckedUpdateManyWithoutOwnerInputSchema';

export const TaskUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export default TaskUpdateManyWithWhereWithoutOwnerInputSchema;
