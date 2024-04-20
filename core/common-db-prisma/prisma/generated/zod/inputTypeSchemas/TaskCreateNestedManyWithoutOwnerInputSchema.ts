import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateWithoutOwnerInputSchema } from './TaskCreateWithoutOwnerInputSchema';
import { TaskUncheckedCreateWithoutOwnerInputSchema } from './TaskUncheckedCreateWithoutOwnerInputSchema';
import { TaskCreateOrConnectWithoutOwnerInputSchema } from './TaskCreateOrConnectWithoutOwnerInputSchema';
import { TaskCreateManyOwnerInputEnvelopeSchema } from './TaskCreateManyOwnerInputEnvelopeSchema';
import { TaskWhereUniqueInputSchema } from './TaskWhereUniqueInputSchema';

export const TaskCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutOwnerInputSchema),z.lazy(() => TaskCreateWithoutOwnerInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => TaskUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => TaskCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TaskCreateNestedManyWithoutOwnerInputSchema;
