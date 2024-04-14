import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionWhereInputSchema } from '../inputTypeSchemas/SessionWhereInputSchema'
import { SessionOrderByWithAggregationInputSchema } from '../inputTypeSchemas/SessionOrderByWithAggregationInputSchema'
import { SessionScalarFieldEnumSchema } from '../inputTypeSchemas/SessionScalarFieldEnumSchema'
import { SessionScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/SessionScalarWhereWithAggregatesInputSchema'

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default SessionGroupByArgsSchema;
