import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomSelectSchema } from '../inputTypeSchemas/WechatRoomSelectSchema';
import { WechatRoomIncludeSchema } from '../inputTypeSchemas/WechatRoomIncludeSchema';

export const WechatRoomArgsSchema: z.ZodType<Prisma.WechatRoomDefaultArgs> = z.object({
  select: z.lazy(() => WechatRoomSelectSchema).optional(),
  include: z.lazy(() => WechatRoomIncludeSchema).optional(),
}).strict();

export default WechatRoomArgsSchema;
