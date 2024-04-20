import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithoutOwnerInputSchema } from './TaskUpdateWithoutOwnerInputSchema';
import { TaskUncheckedUpdateWithoutOwnerInputSchema } from './TaskUncheckedUpdateWithoutOwnerInputSchema';

export const TaskUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export default TaskUpdateWithWhereUniqueWithoutOwnerInputSchema;
