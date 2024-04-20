import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateWithoutRoomInputSchema } from './TaskCreateWithoutRoomInputSchema';
import { TaskUncheckedCreateWithoutRoomInputSchema } from './TaskUncheckedCreateWithoutRoomInputSchema';
import { TaskCreateOrConnectWithoutRoomInputSchema } from './TaskCreateOrConnectWithoutRoomInputSchema';
import { TaskUpsertWithWhereUniqueWithoutRoomInputSchema } from './TaskUpsertWithWhereUniqueWithoutRoomInputSchema';
import { TaskCreateManyRoomInputEnvelopeSchema } from './TaskCreateManyRoomInputEnvelopeSchema';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithWhereUniqueWithoutRoomInputSchema } from './TaskUpdateWithWhereUniqueWithoutRoomInputSchema';
import { TaskUpdateManyWithWhereWithoutRoomInputSchema } from './TaskUpdateManyWithWhereWithoutRoomInputSchema';
import { TaskScalarWhereInputSchema } from './TaskScalarWhereInputSchema';

export const TaskUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutRoomInputSchema),z.lazy(() => TaskCreateWithoutRoomInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema),z.lazy(() => TaskUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutRoomInputSchema),z.lazy(() => TaskCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskUpdateManyWithoutRoomNestedInputSchema;
