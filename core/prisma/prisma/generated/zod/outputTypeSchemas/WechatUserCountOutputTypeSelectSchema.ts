import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const WechatUserCountOutputTypeSelectSchema: z.ZodType<Prisma.WechatUserCountOutputTypeSelect> = z.object({
  sentMessages: z.boolean().optional(),
  receivedMessages: z.boolean().optional(),
  tasks: z.boolean().optional(),
}).strict();

export default WechatUserCountOutputTypeSelectSchema;
