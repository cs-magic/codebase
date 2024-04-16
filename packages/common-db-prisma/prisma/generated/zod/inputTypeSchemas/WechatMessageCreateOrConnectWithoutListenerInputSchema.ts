import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageCreateWithoutListenerInputSchema } from './WechatMessageCreateWithoutListenerInputSchema';
import { WechatMessageUncheckedCreateWithoutListenerInputSchema } from './WechatMessageUncheckedCreateWithoutListenerInputSchema';

export const WechatMessageCreateOrConnectWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageCreateOrConnectWithoutListenerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema) ]),
}).strict();

export default WechatMessageCreateOrConnectWithoutListenerInputSchema;
