import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardUpdateManyMutationInputSchema } from '../inputTypeSchemas/CardUpdateManyMutationInputSchema'
import { CardUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/CardUncheckedUpdateManyInputSchema'
import { CardWhereInputSchema } from '../inputTypeSchemas/CardWhereInputSchema'

export const CardUpdateManyArgsSchema: z.ZodType<Prisma.CardUpdateManyArgs> = z.object({
  data: z.union([ CardUpdateManyMutationInputSchema,CardUncheckedUpdateManyInputSchema ]),
  where: CardWhereInputSchema.optional(),
}).strict() ;

export default CardUpdateManyArgsSchema;
