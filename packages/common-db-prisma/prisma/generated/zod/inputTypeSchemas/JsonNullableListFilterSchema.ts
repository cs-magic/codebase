import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const JsonNullableListFilterSchema: z.ZodType<Prisma.JsonNullableListFilter> = z.object({
  equals: InputJsonValueSchema.array().optional().nullable(),
  has: InputJsonValueSchema.optional().nullable(),
  hasEvery: InputJsonValueSchema.array().optional(),
  hasSome: InputJsonValueSchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export default JsonNullableListFilterSchema;
