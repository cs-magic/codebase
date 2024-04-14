import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';
import { WechatRoomCreateWithoutMessagesInputSchema } from './WechatRoomCreateWithoutMessagesInputSchema';
import { WechatRoomUncheckedCreateWithoutMessagesInputSchema } from './WechatRoomUncheckedCreateWithoutMessagesInputSchema';

export const WechatRoomCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.WechatRoomCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => WechatRoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export default WechatRoomCreateOrConnectWithoutMessagesInputSchema;
