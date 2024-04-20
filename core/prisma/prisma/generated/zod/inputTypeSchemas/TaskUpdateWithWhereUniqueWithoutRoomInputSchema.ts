import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithoutRoomInputSchema } from './TaskUpdateWithoutRoomInputSchema';
import { TaskUncheckedUpdateWithoutRoomInputSchema } from './TaskUncheckedUpdateWithoutRoomInputSchema';

export const TaskUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export default TaskUpdateWithWhereUniqueWithoutRoomInputSchema;
