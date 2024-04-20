import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';
import { WechatRoomCreateWithoutTaskInputSchema } from './WechatRoomCreateWithoutTaskInputSchema';
import { WechatRoomUncheckedCreateWithoutTaskInputSchema } from './WechatRoomUncheckedCreateWithoutTaskInputSchema';

export const WechatRoomCreateOrConnectWithoutTaskInputSchema: z.ZodType<Prisma.WechatRoomCreateOrConnectWithoutTaskInput> = z.object({
  where: z.lazy(() => WechatRoomWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutTaskInputSchema) ]),
}).strict();

export default WechatRoomCreateOrConnectWithoutTaskInputSchema;
