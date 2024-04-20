import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutRoomInputSchema } from './WechatMessageUpdateWithoutRoomInputSchema';
import { WechatMessageUncheckedUpdateWithoutRoomInputSchema } from './WechatMessageUncheckedUpdateWithoutRoomInputSchema';

export const WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithWhereUniqueWithoutRoomInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutRoomInputSchema) ]),
}).strict();

export default WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema;
