import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskCreateWithoutRoomInputSchema } from './TaskCreateWithoutRoomInputSchema';
import { TaskUncheckedCreateWithoutRoomInputSchema } from './TaskUncheckedCreateWithoutRoomInputSchema';

export const TaskCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export default TaskCreateOrConnectWithoutRoomInputSchema;
