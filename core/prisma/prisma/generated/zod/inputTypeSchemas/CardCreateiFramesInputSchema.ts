import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InputJsonValueSchema } from './InputJsonValueSchema';

export const CardCreateiFramesInputSchema: z.ZodType<Prisma.CardCreateiFramesInput> = z.object({
  set: InputJsonValueSchema.array()
}).strict();

export default CardCreateiFramesInputSchema;
