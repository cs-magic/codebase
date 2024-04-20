import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateWithoutRoomInputSchema } from './TaskCreateWithoutRoomInputSchema';
import { TaskUncheckedCreateWithoutRoomInputSchema } from './TaskUncheckedCreateWithoutRoomInputSchema';
import { TaskCreateOrConnectWithoutRoomInputSchema } from './TaskCreateOrConnectWithoutRoomInputSchema';
import { TaskCreateManyRoomInputEnvelopeSchema } from './TaskCreateManyRoomInputEnvelopeSchema';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';

export const TaskCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutRoomInputSchema),z.lazy(() => TaskCreateWithoutRoomInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutRoomInputSchema),z.lazy(() => TaskCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskCreateNestedManyWithoutRoomInputSchema;
