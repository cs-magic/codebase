import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutTalkerInputSchema } from './WechatMessageUpdateWithoutTalkerInputSchema';
import { WechatMessageUncheckedUpdateWithoutTalkerInputSchema } from './WechatMessageUncheckedUpdateWithoutTalkerInputSchema';
import { WechatMessageCreateWithoutTalkerInputSchema } from './WechatMessageCreateWithoutTalkerInputSchema';
import { WechatMessageUncheckedCreateWithoutTalkerInputSchema } from './WechatMessageUncheckedCreateWithoutTalkerInputSchema';

export const WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUpsertWithWhereUniqueWithoutTalkerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutTalkerInputSchema) ]),
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema) ]),
}).strict();

export default WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema;
