import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"
import { WechatRoomArgsSchema } from "../outputTypeSchemas/WechatRoomArgsSchema"

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

export default WechatMessageSelectSchema;
