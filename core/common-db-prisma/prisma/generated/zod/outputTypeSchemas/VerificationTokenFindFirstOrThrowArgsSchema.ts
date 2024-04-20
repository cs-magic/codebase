import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenWhereInputSchema } from '../inputTypeSchemas/VerificationTokenWhereInputSchema'
import { VerificationTokenOrderByWithRelationInputSchema } from '../inputTypeSchemas/VerificationTokenOrderByWithRelationInputSchema'
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'
import { VerificationTokenScalarFieldEnumSchema } from '../inputTypeSchemas/VerificationTokenScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default VerificationTokenFindFirstOrThrowArgsSchema;
