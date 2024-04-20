import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomUpdateWithoutTaskInputSchema } from './WechatRoomUpdateWithoutTaskInputSchema';
import { WechatRoomUncheckedUpdateWithoutTaskInputSchema } from './WechatRoomUncheckedUpdateWithoutTaskInputSchema';
import { WechatRoomCreateWithoutTaskInputSchema } from './WechatRoomCreateWithoutTaskInputSchema';
import { WechatRoomUncheckedCreateWithoutTaskInputSchema } from './WechatRoomUncheckedCreateWithoutTaskInputSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const WechatRoomUpsertWithoutTaskInputSchema: z.ZodType<Prisma.WechatRoomUpsertWithoutTaskInput> = z.object({
  update: z.union([ z.lazy(() => WechatRoomUpdateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutTaskInputSchema) ]),
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutTaskInputSchema) ]),
  where: z.lazy(() => WechatRoomWhereInputSchema).optional()
}).strict();

export default WechatRoomUpsertWithoutTaskInputSchema;
