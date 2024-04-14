import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';
import { WechatMessageUpdateManyMutationInputSchema } from './WechatMessageUpdateManyMutationInputSchema';
import { WechatMessageUncheckedUpdateManyWithoutListenerInputSchema } from './WechatMessageUncheckedUpdateManyWithoutListenerInputSchema';

export const WechatMessageUpdateManyWithWhereWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageUpdateManyWithWhereWithoutListenerInput> = z.object({
  where: z.lazy(() => WechatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateManyMutationInputSchema),z.lazy(() => WechatMessageUncheckedUpdateManyWithoutListenerInputSchema) ]),
}).strict();

export default WechatMessageUpdateManyWithWhereWithoutListenerInputSchema;
