import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserUpdateWithoutSentMessagesInputSchema } from './WechatUserUpdateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutSentMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutSentMessagesInputSchema';

export const WechatUserUpdateToOneWithWhereWithoutSentMessagesInputSchema: z.ZodType<Prisma.WechatUserUpdateToOneWithWhereWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => WechatUserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WechatUserUpdateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
}).strict();

export default WechatUserUpdateToOneWithWhereWithoutSentMessagesInputSchema;
