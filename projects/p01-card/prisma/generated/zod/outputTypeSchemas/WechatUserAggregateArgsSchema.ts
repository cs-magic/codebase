import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserWhereInputSchema } from '../inputTypeSchemas/WechatUserWhereInputSchema'
import { WechatUserOrderByWithRelationInputSchema } from '../inputTypeSchemas/WechatUserOrderByWithRelationInputSchema'
import { WechatUserWhereUniqueInputSchema } from '../inputTypeSchemas/WechatUserWhereUniqueInputSchema'

export const WechatUserAggregateArgsSchema: z.ZodType<Prisma.WechatUserAggregateArgs> = z.object({
  where: WechatUserWhereInputSchema.optional(),
  orderBy: z.union([ WechatUserOrderByWithRelationInputSchema.array(),WechatUserOrderByWithRelationInputSchema ]).optional(),
  cursor: WechatUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatUserAggregateArgsSchema;
