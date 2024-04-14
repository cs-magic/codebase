import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomWhereInputSchema } from '../inputTypeSchemas/WechatRoomWhereInputSchema'
import { WechatRoomOrderByWithAggregationInputSchema } from '../inputTypeSchemas/WechatRoomOrderByWithAggregationInputSchema'
import { WechatRoomScalarFieldEnumSchema } from '../inputTypeSchemas/WechatRoomScalarFieldEnumSchema'
import { WechatRoomScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/WechatRoomScalarWhereWithAggregatesInputSchema'

export const WechatRoomGroupByArgsSchema: z.ZodType<Prisma.WechatRoomGroupByArgs> = z.object({
  where: WechatRoomWhereInputSchema.optional(),
  orderBy: z.union([ WechatRoomOrderByWithAggregationInputSchema.array(),WechatRoomOrderByWithAggregationInputSchema ]).optional(),
  by: WechatRoomScalarFieldEnumSchema.array(),
  having: WechatRoomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default WechatRoomGroupByArgsSchema;
