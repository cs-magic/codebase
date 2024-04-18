import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { EnumTaskStatusFieldUpdateOperationsInputSchema } from './EnumTaskStatusFieldUpdateOperationsInputSchema';
import { TaskUpdatenotesInputSchema } from './TaskUpdatenotesInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';

export const TaskUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.TaskUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.lazy(() => TaskUpdatenotesInputSchema),z.string().array() ]).optional(),
  priority: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default TaskUpdateWithoutOwnerInputSchema;
