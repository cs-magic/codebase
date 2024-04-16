import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUpdateInputSchema'
import { VerificationTokenUncheckedUpdateInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedUpdateInputSchema'
import { VerificationTokenWhereUniqueInputSchema } from '../inputTypeSchemas/VerificationTokenWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export default VerificationTokenUpdateArgsSchema;
