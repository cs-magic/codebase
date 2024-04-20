import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  notes: z.boolean().optional(),
  priority: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
}).strict()

export default TaskSelectSchema;
