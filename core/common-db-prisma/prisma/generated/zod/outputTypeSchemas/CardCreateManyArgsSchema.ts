import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardCreateManyInputSchema } from '../inputTypeSchemas/CardCreateManyInputSchema'

export const CardCreateManyArgsSchema: z.ZodType<Prisma.CardCreateManyArgs> = z.object({
  data: z.union([ CardCreateManyInputSchema,CardCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default CardCreateManyArgsSchema;
