import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageWhereInputSchema } from '../inputTypeSchemas/WechatMessageWhereInputSchema'
import { WechatMessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/WechatMessageOrderByWithRelationInputSchema'
import { WechatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/WechatMessageWhereUniqueInputSchema'

export const WechatMessageAggregateArgsSchema: z.ZodType<Prisma.WechatMessageAggregateArgs> = z.object({
  where: WechatMessageWhereInputSchema.optional(),
  orderBy: z.union([ WechatMessageOrderByWithRelationInputSchema.array(),WechatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: WechatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatMessageAggregateArgsSchema;
