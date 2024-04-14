import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageFindManyArgsSchema } from "../outputTypeSchemas/WechatMessageFindManyArgsSchema"
import { WechatRoomCountOutputTypeArgsSchema } from "../outputTypeSchemas/WechatRoomCountOutputTypeArgsSchema"

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
  _count: z.union([z.boolean(),z.lazy(() => WechatRoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WechatRoomSelectSchema;
