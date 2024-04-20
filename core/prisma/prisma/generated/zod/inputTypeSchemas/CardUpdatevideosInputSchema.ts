import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const CardUpdatevideosInputSchema: z.ZodType<Prisma.CardUpdatevideosInput> = z.object({
  set: InputJsonValueSchema.array().optional(),
  push: z.union([ InputJsonValueSchema,InputJsonValueSchema.array() ]).optional(),
}).strict();

export default CardUpdatevideosInputSchema;
