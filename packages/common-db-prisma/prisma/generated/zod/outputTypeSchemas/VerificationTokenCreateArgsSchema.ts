import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenCreateInputSchema } from '../inputTypeSchemas/VerificationTokenCreateInputSchema'
import { VerificationTokenUncheckedCreateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export default VerificationTokenCreateArgsSchema;
