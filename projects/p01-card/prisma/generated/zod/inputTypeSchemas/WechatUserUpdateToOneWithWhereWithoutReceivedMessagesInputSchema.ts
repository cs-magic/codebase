import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUpdateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema';

export const WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => WechatUserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WechatUserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema;
