import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereInputSchema } from '../inputTypeSchemas/VerificationTokenWhereInputSchema'
import { VerificationTokenOrderByWithAggregationInputSchema } from '../inputTypeSchemas/VerificationTokenOrderByWithAggregationInputSchema'
import { VerificationTokenScalarFieldEnumSchema } from '../inputTypeSchemas/VerificationTokenScalarFieldEnumSchema'
import { VerificationTokenScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/VerificationTokenScalarWhereWithAggregatesInputSchema'

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default VerificationTokenGroupByArgsSchema;
