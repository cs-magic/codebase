import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomCountOutputTypeSelectSchema } from './WechatRoomCountOutputTypeSelectSchema';

export const WechatRoomCountOutputTypeArgsSchema: z.ZodType<Prisma.WechatRoomCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WechatRoomCountOutputTypeSelectSchema).nullish(),
}).strict();

export default WechatRoomCountOutputTypeSelectSchema;
