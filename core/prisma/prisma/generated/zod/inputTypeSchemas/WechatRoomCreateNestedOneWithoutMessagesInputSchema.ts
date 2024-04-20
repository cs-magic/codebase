import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateWithoutMessagesInputSchema } from './WechatRoomCreateWithoutMessagesInputSchema';
import { WechatRoomUncheckedCreateWithoutMessagesInputSchema } from './WechatRoomUncheckedCreateWithoutMessagesInputSchema';
import { WechatRoomCreateOrConnectWithoutMessagesInputSchema } from './WechatRoomCreateOrConnectWithoutMessagesInputSchema';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';

export const WechatRoomCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.WechatRoomCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatRoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => WechatRoomWhereUniqueInputSchema).optional()
}).strict();

export default WechatRoomCreateNestedOneWithoutMessagesInputSchema;
