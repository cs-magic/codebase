import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardWhereInputSchema } from '../inputTypeSchemas/CardWhereInputSchema'
import { CardOrderByWithAggregationInputSchema } from '../inputTypeSchemas/CardOrderByWithAggregationInputSchema'
import { CardScalarFieldEnumSchema } from '../inputTypeSchemas/CardScalarFieldEnumSchema'
import { CardScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/CardScalarWhereWithAggregatesInputSchema'

export const CardGroupByArgsSchema: z.ZodType<Prisma.CardGroupByArgs> = z.object({
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithAggregationInputSchema.array(),CardOrderByWithAggregationInputSchema ]).optional(),
  by: CardScalarFieldEnumSchema.array(),
  having: CardScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default CardGroupByArgsSchema;
