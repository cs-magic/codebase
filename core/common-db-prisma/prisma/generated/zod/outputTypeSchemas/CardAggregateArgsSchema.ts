import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardWhereInputSchema } from '../inputTypeSchemas/CardWhereInputSchema'
import { CardOrderByWithRelationInputSchema } from '../inputTypeSchemas/CardOrderByWithRelationInputSchema'
import { CardWhereUniqueInputSchema } from '../inputTypeSchemas/CardWhereUniqueInputSchema'

export const CardAggregateArgsSchema: z.ZodType<Prisma.CardAggregateArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CardAggregateArgsSchema;
