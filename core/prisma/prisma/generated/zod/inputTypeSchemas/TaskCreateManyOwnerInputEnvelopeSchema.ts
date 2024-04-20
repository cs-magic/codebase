import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateManyOwnerInputSchema } from './TaskCreateManyOwnerInputSchema';

export const TaskCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyOwnerInputSchema),z.lazy(() => TaskCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskCreateManyOwnerInputEnvelopeSchema;
