import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserIncludeSchema } from '../inputTypeSchemas/WechatUserIncludeSchema'
import { WechatUserWhereUniqueInputSchema } from '../inputTypeSchemas/WechatUserWhereUniqueInputSchema'
import { WechatMessageFindManyArgsSchema } from "../outputTypeSchemas/WechatMessageFindManyArgsSchema"
import { TaskFindManyArgsSchema } from "../outputTypeSchemas/TaskFindManyArgsSchema"
import { WechatUserCountOutputTypeArgsSchema } from "../outputTypeSchemas/WechatUserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WechatUserSelectSchema: z.ZodType<Prisma.WechatUserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  avatar: z.boolean().optional(),
  friend: z.boolean().optional(),
  gender: z.boolean().optional(),
  type: z.boolean().optional(),
  weixin: z.boolean().optional(),
  alias: z.boolean().optional(),
  city: z.boolean().optional(),
  province: z.boolean().optional(),
  signature: z.boolean().optional(),
  phone: z.boolean().optional(),
  preference: z.boolean().optional(),
  data: z.boolean().optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WechatUserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WechatUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WechatUserFindUniqueOrThrowArgs> = z.object({
  select: WechatUserSelectSchema.optional(),
  include: WechatUserIncludeSchema.optional(),
  where: WechatUserWhereUniqueInputSchema,
}).strict() ;

export default WechatUserFindUniqueOrThrowArgsSchema;
