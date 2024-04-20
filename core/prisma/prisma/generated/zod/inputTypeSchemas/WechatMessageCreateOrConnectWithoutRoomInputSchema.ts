import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageCreateWithoutRoomInputSchema } from './WechatMessageCreateWithoutRoomInputSchema';
import { WechatMessageUncheckedCreateWithoutRoomInputSchema } from './WechatMessageUncheckedCreateWithoutRoomInputSchema';

export const WechatMessageCreateOrConnectWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageCreateOrConnectWithoutRoomInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export default WechatMessageCreateOrConnectWithoutRoomInputSchema;
