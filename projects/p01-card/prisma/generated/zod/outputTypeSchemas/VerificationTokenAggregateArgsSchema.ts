import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereInputSchema } from '../inputTypeSchemas/VerificationTokenWhereInputSchema'
import { VerificationTokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/VerificationTokenOrderByWithRelationInputSchema'
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default VerificationTokenAggregateArgsSchema;
