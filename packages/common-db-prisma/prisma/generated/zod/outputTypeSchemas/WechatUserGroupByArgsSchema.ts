import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserWhereInputSchema } from '../inputTypeSchemas/WechatUserWhereInputSchema'
import { WechatUserOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WechatUserOrderByWithAggregationInputSchema'
import { WechatUserScalarFieldEnumSchema } from '../inputTypeSchemas/WechatUserScalarFieldEnumSchema'
import { WechatUserScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WechatUserScalarWhereWithAggregatesInputSchema'

export const WechatUserGroupByArgsSchema: z.ZodType<Prisma.WechatUserGroupByArgs> = z.object({
  where: WechatUserWhereInputSchema.optional(),
  orderBy: z.union([ WechatUserOrderByWithAggregationInputSchema.array(),WechatUserOrderByWithAggregationInputSchema ]).optional(),
  by: WechatUserScalarFieldEnumSchema.array(),
  having: WechatUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatUserGroupByArgsSchema;
