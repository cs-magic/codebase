import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateWithoutOwnerInputSchema } from './TaskCreateWithoutOwnerInputSchema';
import { TaskUncheckedCreateWithoutOwnerInputSchema } from './TaskUncheckedCreateWithoutOwnerInputSchema';
import { TaskCreateOrConnectWithoutOwnerInputSchema } from './TaskCreateOrConnectWithoutOwnerInputSchema';
import { TaskUpsertWithWhereUniqueWithoutOwnerInputSchema } from './TaskUpsertWithWhereUniqueWithoutOwnerInputSchema';
import { TaskCreateManyOwnerInputEnvelopeSchema } from './TaskCreateManyOwnerInputEnvelopeSchema';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';
import { TaskUpdateWithWhereUniqueWithoutOwnerInputSchema } from './TaskUpdateWithWhereUniqueWithoutOwnerInputSchema';
import { TaskUpdateManyWithWhereWithoutOwnerInputSchema } from './TaskUpdateManyWithWhereWithoutOwnerInputSchema';
import { TaskScalarWhereInputSchema } from './TaskScalarWhereInputSchema';

export const TaskUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOwnerInputSchema),z.lazy(() => TaskCreateWithoutOwnerInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TaskUpdateManyWithoutOwnerNestedInputSchema;
