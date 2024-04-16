import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageCreateWithoutTalkerInputSchema } from './WechatMessageCreateWithoutTalkerInputSchema';
import { WechatMessageUncheckedCreateWithoutTalkerInputSchema } from './WechatMessageUncheckedCreateWithoutTalkerInputSchema';

export const WechatMessageCreateOrConnectWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageCreateOrConnectWithoutTalkerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema) ]),
}).strict();

export default WechatMessageCreateOrConnectWithoutTalkerInputSchema;
