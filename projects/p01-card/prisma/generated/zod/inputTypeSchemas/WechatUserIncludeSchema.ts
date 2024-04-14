import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageFindManyArgsSchema } from "../outputTypeSchemas/WechatMessageFindManyArgsSchema"
import { TaskFindManyArgsSchema } from "../outputTypeSchemas/TaskFindManyArgsSchema"
import { WechatUserCountOutputTypeArgsSchema } from "../outputTypeSchemas/WechatUserCountOutputTypeArgsSchema"

export const WechatUserIncludeSchema: z.ZodType<Prisma.WechatUserInclude> = z.object({
  sentMessages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => WechatMessageFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WechatUserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default WechatUserIncludeSchema;
