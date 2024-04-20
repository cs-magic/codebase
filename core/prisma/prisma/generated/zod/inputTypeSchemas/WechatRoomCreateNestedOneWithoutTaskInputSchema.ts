import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateWithoutTaskInputSchema } from './WechatRoomCreateWithoutTaskInputSchema';
import { WechatRoomUncheckedCreateWithoutTaskInputSchema } from './WechatRoomUncheckedCreateWithoutTaskInputSchema';
import { WechatRoomCreateOrConnectWithoutTaskInputSchema } from './WechatRoomCreateOrConnectWithoutTaskInputSchema';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';

export const WechatRoomCreateNestedOneWithoutTaskInputSchema: z.ZodType<Prisma.WechatRoomCreateNestedOneWithoutTaskInput> = z.object({
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatRoomCreateOrConnectWithoutTaskInputSchema).optional(),
  connect: z.lazy(() => WechatRoomWhereUniqueInputSchema).optional()
}).strict();

export default WechatRoomCreateNestedOneWithoutTaskInputSchema;
