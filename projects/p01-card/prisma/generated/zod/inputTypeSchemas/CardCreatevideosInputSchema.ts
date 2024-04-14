import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const CardCreatevideosInputSchema: z.ZodType<Prisma.CardCreatevideosInput> = z.object({
  set: InputJsonValueSchema.array()
}).strict();

export default CardCreatevideosInputSchema;
