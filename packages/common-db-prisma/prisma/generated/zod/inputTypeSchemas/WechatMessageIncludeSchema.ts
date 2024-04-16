import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"
import { WechatRoomArgsSchema } from "../outputTypeSchemas/WechatRoomArgsSchema"

export const WechatMessageIncludeSchema: z.ZodType<Prisma.WechatMessageInclude> = z.object({
  talker: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
  listener: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
  room: z.union([z.boolean(),z.lazy(() => WechatRoomArgsSchema)]).optional(),
}).strict()

export default WechatMessageIncludeSchema;
