import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const WechatRoomCountOutputTypeSelectSchema: z.ZodType<Prisma.WechatRoomCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export default WechatRoomCountOutputTypeSelectSchema;
