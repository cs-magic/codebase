import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskScalarWhereInputSchema } from './TaskScalarWhereInputSchema';
import { TaskUpdateManyMutationInputSchema } from './TaskUpdateManyMutationInputSchema';
import { TaskUncheckedUpdateManyWithoutRoomInputSchema } from './TaskUncheckedUpdateManyWithoutRoomInputSchema';

export const TaskUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export default TaskUpdateManyWithWhereWithoutRoomInputSchema;
