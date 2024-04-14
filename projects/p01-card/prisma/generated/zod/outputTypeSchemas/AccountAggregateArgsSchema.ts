import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { AccountWhereInputSchema } from '../inputTypeSchemas/AccountWhereInputSchema'
import { AccountOrderByWithRelationInputSchema } from '../inputTypeSchemas/AccountOrderByWithRelationInputSchema'
import { AccountWhereUniqueInputSchema } from '../inputTypeSchemas/AccountWhereUniqueInputSchema'

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default AccountAggregateArgsSchema;
