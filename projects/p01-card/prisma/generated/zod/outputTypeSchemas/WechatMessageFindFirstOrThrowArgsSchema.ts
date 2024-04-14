import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageIncludeSchema } from '../inputTypeSchemas/WechatMessageIncludeSchema'
import { WechatMessageWhereInputSchema } from '../inputTypeSchemas/WechatMessageWhereInputSchema'
import { WechatMessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/WechatMessageOrderByWithRelationInputSchema'
import { WechatMessageWhereUniqueInputSchema } from '../inputTypeSchemas/WechatMessageWhereUniqueInputSchema'
import { WechatMessageScalarFieldEnumSchema } from '../inputTypeSchemas/WechatMessageScalarFieldEnumSchema'
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"
import { WechatRoomArgsSchema } from "../outputTypeSchemas/WechatRoomArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WechatMessageSelectSchema: z.ZodType<Prisma.WechatMessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  talkerId: z.boolean().optional(),
  listenerId: z.boolean().optional(),
  roomId: z.boolean().optional(),
  timestamp: z.boolean().optional(),
  type: z.boolean().optional(),
  text: z.boolean().optional(),
  mentionIdList: z.boolean().optional(),
  filename: z.boolean().optional(),
  talker: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
  listener: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
  room: z.union([z.boolean(),z.lazy(() => WechatRoomArgsSchema)]).optional(),
}).strict()

export const WechatMessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WechatMessageFindFirstOrThrowArgs> = z.object({
  select: WechatMessageSelectSchema.optional(),
  include: WechatMessageIncludeSchema.optional(),
  where: WechatMessageWhereInputSchema.optional(),
  orderBy: z.union([ WechatMessageOrderByWithRelationInputSchema.array(),WechatMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: WechatMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WechatMessageScalarFieldEnumSchema,WechatMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default WechatMessageFindFirstOrThrowArgsSchema;
