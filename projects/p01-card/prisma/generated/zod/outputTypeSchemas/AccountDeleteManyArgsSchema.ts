import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereInputSchema } from '../inputTypeSchemas/AccountWhereInputSchema'

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export default AccountDeleteManyArgsSchema;
