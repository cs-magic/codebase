import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserUpdateWithoutSentMessagesInputSchema } from './WechatUserUpdateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutSentMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutSentMessagesInputSchema';
import { WechatUserCreateWithoutSentMessagesInputSchema } from './WechatUserCreateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutSentMessagesInputSchema } from './WechatUserUncheckedCreateWithoutSentMessagesInputSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const WechatUserUpsertWithoutSentMessagesInputSchema: z.ZodType<Prisma.WechatUserUpsertWithoutSentMessagesInput> = z.object({
  update: z.union([ z.lazy(() => WechatUserUpdateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutSentMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutSentMessagesInputSchema) ]),
  where: z.lazy(() => WechatUserWhereInputSchema).optional()
}).strict();

export default WechatUserUpsertWithoutSentMessagesInputSchema;
