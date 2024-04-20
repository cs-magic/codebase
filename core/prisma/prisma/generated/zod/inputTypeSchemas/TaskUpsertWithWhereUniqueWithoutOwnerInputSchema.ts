import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithoutOwnerInputSchema } from './TaskUpdateWithoutOwnerInputSchema';
import { TaskUncheckedUpdateWithoutOwnerInputSchema } from './TaskUncheckedUpdateWithoutOwnerInputSchema';
import { TaskCreateWithoutOwnerInputSchema } from './TaskCreateWithoutOwnerInputSchema';
import { TaskUncheckedCreateWithoutOwnerInputSchema } from './TaskUncheckedCreateWithoutOwnerInputSchema';

export const TaskUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export default TaskUpsertWithWhereUniqueWithoutOwnerInputSchema;
