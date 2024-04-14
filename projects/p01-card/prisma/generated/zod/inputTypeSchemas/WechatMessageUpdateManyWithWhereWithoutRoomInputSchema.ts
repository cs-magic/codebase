import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';
import { WechatMessageUpdateManyMutationInputSchema } from './WechatMessageUpdateManyMutationInputSchema';
import { WechatMessageUncheckedUpdateManyWithoutRoomInputSchema } from './WechatMessageUncheckedUpdateManyWithoutRoomInputSchema';

export const WechatMessageUpdateManyWithWhereWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageUpdateManyWithWhereWithoutRoomInput> = z.object({
  where: z.lazy(() => WechatMessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WechatMessageUpdateManyMutationInputSchema),z.lazy(() => WechatMessageUncheckedUpdateManyWithoutRoomInputSchema) ]),
}).strict();

export default WechatMessageUpdateManyWithWhereWithoutRoomInputSchema;
