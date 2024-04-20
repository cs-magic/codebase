import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomIncludeSchema } from '../inputTypeSchemas/WechatRoomIncludeSchema'
import { WechatRoomWhereInputSchema } from '../inputTypeSchemas/WechatRoomWhereInputSchema'
import { WechatRoomOrderByWithRelationInputSchema } from '../inputTypeSchemas/WechatRoomOrderByWithRelationInputSchema'
import { WechatRoomWhereUniqueInputSchema } from '../inputTypeSchemas/WechatRoomWhereUniqueInputSchema'
import { WechatRoomScalarFieldEnumSchema } from '../inputTypeSchemas/WechatRoomScalarFieldEnumSchema'
import { WechatMessageFindManyArgsSchema } from "../outputTypeSchemas/WechatMessageFindManyArgsSchema"
import { TaskFindManyArgsSchema } from "../outputTypeSchemas/TaskFindManyArgsSchema"
import { WechatRoomCountOutputTypeArgsSchema } from "../outputTypeSchemas/WechatRoomCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WechatRoomSelectSchema: z.ZodType<Prisma.WechatRoomSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  adminIdList: z.boolean().optional(),
  memberIdList: z.boolean().optional(),
  avatar: z.boolean().optional(),
  topic: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  preference: z.boolean().optional(),
  data: z.boolean().optional(),
  messages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  Task: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WechatRoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WechatRoomFindManyArgsSchema: z.ZodType<Prisma.WechatRoomFindManyArgs> = z.object({
  select: WechatRoomSelectSchema.optional(),
  include: WechatRoomIncludeSchema.optional(),
  where: WechatRoomWhereInputSchema.optional(),
  orderBy: z.union([ WechatRoomOrderByWithRelationInputSchema.array(),WechatRoomOrderByWithRelationInputSchema ]).optional(),
  cursor: WechatRoomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WechatRoomScalarFieldEnumSchema,WechatRoomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default WechatRoomFindManyArgsSchema;
