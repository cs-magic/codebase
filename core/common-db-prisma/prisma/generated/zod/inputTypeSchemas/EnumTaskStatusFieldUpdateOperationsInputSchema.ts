import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TaskStatusSchema } from './TaskStatusSchema';

export const EnumTaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskStatusSchema).optional()
}).strict();

export default EnumTaskStatusFieldUpdateOperationsInputSchema;
