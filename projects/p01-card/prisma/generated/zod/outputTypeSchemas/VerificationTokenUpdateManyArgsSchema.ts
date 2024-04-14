import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationTokenUpdateManyMutationInputSchema } from '../inputTypeSchemas/VerificationTokenUpdateManyMutationInputSchema'
import { VerificationTokenUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/VerificationTokenUncheckedUpdateManyInputSchema'
import { VerificationTokenWhereInputSchema } from '../inputTypeSchemas/VerificationTokenWhereInputSchema'

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export default VerificationTokenUpdateManyArgsSchema;
