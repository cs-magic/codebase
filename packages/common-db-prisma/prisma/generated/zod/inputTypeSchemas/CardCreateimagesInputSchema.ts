import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const CardCreateimagesInputSchema: z.ZodType<Prisma.CardCreateimagesInput> = z.object({
  set: InputJsonValueSchema.array()
}).strict();

export default CardCreateimagesInputSchema;
