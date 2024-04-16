import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  owner: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
}).strict()

export default TaskIncludeSchema;
