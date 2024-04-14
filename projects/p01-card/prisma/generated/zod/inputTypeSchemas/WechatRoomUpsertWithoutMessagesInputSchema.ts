import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomUpdateWithoutMessagesInputSchema } from './WechatRoomUpdateWithoutMessagesInputSchema';
import { WechatRoomUncheckedUpdateWithoutMessagesInputSchema } from './WechatRoomUncheckedUpdateWithoutMessagesInputSchema';
import { WechatRoomCreateWithoutMessagesInputSchema } from './WechatRoomCreateWithoutMessagesInputSchema';
import { WechatRoomUncheckedCreateWithoutMessagesInputSchema } from './WechatRoomUncheckedCreateWithoutMessagesInputSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';

export const WechatRoomUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.WechatRoomUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => WechatRoomUpdateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => WechatRoomWhereInputSchema).optional()
}).strict();

export default WechatRoomUpsertWithoutMessagesInputSchema;
