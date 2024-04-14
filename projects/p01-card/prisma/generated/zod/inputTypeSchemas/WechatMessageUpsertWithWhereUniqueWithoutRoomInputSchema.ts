import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutRoomInputSchema } from './WechatMessageUpdateWithoutRoomInputSchema';
import { WechatMessageUncheckedUpdateWithoutRoomInputSchema } from './WechatMessageUncheckedUpdateWithoutRoomInputSchema';
import { WechatMessageCreateWithoutRoomInputSchema } from './WechatMessageCreateWithoutRoomInputSchema';
import { WechatMessageUncheckedCreateWithoutRoomInputSchema } from './WechatMessageUncheckedCreateWithoutRoomInputSchema';

export const WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageUpsertWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutRoomInputSchema) ]),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema) ]),
}).strict();

export default WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema;
