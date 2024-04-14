import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutListenerInputSchema } from './WechatMessageUpdateWithoutListenerInputSchema';
import { WechatMessageUncheckedUpdateWithoutListenerInputSchema } from './WechatMessageUncheckedUpdateWithoutListenerInputSchema';
import { WechatMessageCreateWithoutListenerInputSchema } from './WechatMessageCreateWithoutListenerInputSchema';
import { WechatMessageUncheckedCreateWithoutListenerInputSchema } from './WechatMessageUncheckedCreateWithoutListenerInputSchema';

export const WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageUpsertWithWhereUniqueWithoutListenerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutListenerInputSchema) ]),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema) ]),
}).strict();

export default WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema;
