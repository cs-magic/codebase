import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomWhereInputSchema } from '../inputTypeSchemas/WechatRoomWhereInputSchema'
import { WechatRoomOrderByWithRelationInputSchema } from '../inputTypeSchemas/WechatRoomOrderByWithRelationInputSchema'
import { WechatRoomWhereUniqueInputSchema } from '../inputTypeSchemas/WechatRoomWhereUniqueInputSchema'

export const WechatRoomAggregateArgsSchema: z.ZodType<Prisma.WechatRoomAggregateArgs> = z.object({
  where: WechatRoomWhereInputSchema.optional(),
  orderBy: z.union([ WechatRoomOrderByWithRelationInputSchema.array(),WechatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: WechatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatRoomAggregateArgsSchema;
