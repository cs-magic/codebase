import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskCreateManyRoomInputSchema } from './TaskCreateManyRoomInputSchema';

export const TaskCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyRoomInputSchema),z.lazy(() => TaskCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default TaskCreateManyRoomInputEnvelopeSchema;
