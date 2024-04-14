import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const CardUpdateimagesInputSchema: z.ZodType<Prisma.CardUpdateimagesInput> = z.object({
  set: InputJsonValueSchema.array().optional(),
  push: z.union([ InputJsonValueSchema,InputJsonValueSchema.array() ]).optional(),
}).strict();

export default CardUpdateimagesInputSchema;
