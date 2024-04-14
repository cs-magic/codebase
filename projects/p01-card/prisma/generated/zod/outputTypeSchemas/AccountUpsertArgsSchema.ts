import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountIncludeSchema } from '../inputTypeSchemas/AccountIncludeSchema'
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'
import { AccountCreateInputSchema } from '../inputTypeSchemas/AccountCreateInputSchema'
import { AccountUncheckedCreateInputSchema } from '../inputTypeSchemas/AccountUncheckedCreateInputSchema'
import { AccountUpdateInputSchema } from '../inputTypeSchemas/AccountUpdateInputSchema'
import { AccountUncheckedUpdateInputSchema } from '../inputTypeSchemas/AccountUncheckedUpdateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export default AccountUpsertArgsSchema;
