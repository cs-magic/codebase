import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenCreateManyInputSchema } from '../inputTypeSchemas/VerificationTokenCreateManyInputSchema'

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default VerificationTokenCreateManyArgsSchema;
