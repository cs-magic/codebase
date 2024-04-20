import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithoutRoomInputSchema } from './TaskUpdateWithoutRoomInputSchema';
import { TaskUncheckedUpdateWithoutRoomInputSchema } from './TaskUncheckedUpdateWithoutRoomInputSchema';
import { TaskCreateWithoutRoomInputSchema } from './TaskCreateWithoutRoomInputSchema';
import { TaskUncheckedCreateWithoutRoomInputSchema } from './TaskUncheckedCreateWithoutRoomInputSchema';

export const TaskUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export default TaskUpsertWithWhereUniqueWithoutRoomInputSchema;
