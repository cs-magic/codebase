import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithoutTalkerInputSchema } from './WechatMessageUpdateWithoutTalkerInputSchema';
import { WechatMessageUncheckedUpdateWithoutTalkerInputSchema } from './WechatMessageUncheckedUpdateWithoutTalkerInputSchema';

export const WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithWhereUniqueWithoutTalkerInput> = z.object({
  where: z.lazy(() => WechatMessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedUpdateWithoutTalkerInputSchema) ]),
}).strict();

export default WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema;
