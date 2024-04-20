import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageWhereInputSchema } from '../inputTypeSchemas/WechatMessageWhereInputSchema'
import { WechatMessageOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WechatMessageOrderByWithAggregationInputSchema'
import { WechatMessageScalarFieldEnumSchema } from '../inputTypeSchemas/WechatMessageScalarFieldEnumSchema'
import { WechatMessageScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WechatMessageScalarWhereWithAggregatesInputSchema'

export const WechatMessageGroupByArgsSchema: z.ZodType<Prisma.WechatMessageGroupByArgs> = z.object({
  where: WechatMessageWhereInputSchema.optional(),
  orderBy: z.union([ WechatMessageOrderByWithAggregationInputSchema.array(),WechatMessageOrderByWithAggregationInputSchema ]).optional(),
  by: WechatMessageScalarFieldEnumSchema.array(),
  having: WechatMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatMessageGroupByArgsSchema;
