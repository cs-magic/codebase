import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountUpdateManyMutationInputSchema } from '../inputTypeSchemas/AccountUpdateManyMutationInputSchema'
import { AccountUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/AccountUncheckedUpdateManyInputSchema'
import { AccountWhereInputSchema } from '../inputTypeSchemas/AccountWhereInputSchema'

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export default AccountUpdateManyArgsSchema;
