import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskCreateWithoutOwnerInputSchema } from './TaskCreateWithoutOwnerInputSchema';
import { TaskUncheckedCreateWithoutOwnerInputSchema } from './TaskUncheckedCreateWithoutOwnerInputSchema';

export const TaskCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export default TaskCreateOrConnectWithoutOwnerInputSchema;
