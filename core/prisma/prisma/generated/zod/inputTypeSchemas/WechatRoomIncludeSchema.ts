import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageFindManyArgsSchema } from "../outputTypeSchemas/WechatMessageFindManyArgsSchema"
import { WechatRoomCountOutputTypeArgsSchema } from "../outputTypeSchemas/WechatRoomCountOutputTypeArgsSchema"

export const WechatRoomIncludeSchema: z.ZodType<Prisma.WechatRoomInclude> = z.object({
  messages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WechatRoomCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WechatRoomIncludeSchema;
