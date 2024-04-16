import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutListenerInputSchema } from './WechatMessageUpdateWithoutListenerInputSchema';
import { WechatMessageUncheckedUpdateWithoutListenerInputSchema } from './WechatMessageUncheckedUpdateWithoutListenerInputSchema';

export const WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithWhereUniqueWithoutListenerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutListenerInputSchema) ]),
}).strict();

export default WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema;
