import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';
import { WechatMessageUpdateManyMutationInputSchema } from './WechatMessageUpdateManyMutationInputSchema';
import { WechatMessageUncheckedUpdateManyWithoutTalkerInputSchema } from './WechatMessageUncheckedUpdateManyWithoutTalkerInputSchema';

export const WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUpdateManyWithWhereWithoutTalkerInput> = z.object({
  where: z.lazy(() => WechatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateManyMutationInputSchema),z.lazy(() => WechatMessageUncheckedUpdateManyWithoutTalkerInputSchema) ]),
}).strict();

export default WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema;
