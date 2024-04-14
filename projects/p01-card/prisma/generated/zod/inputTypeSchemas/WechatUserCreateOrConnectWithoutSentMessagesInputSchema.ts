import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserCreateWithoutSentMessagesInputSchema } from './WechatUserCreateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutSentMessagesInputSchema } from './WechatUserUncheckedCreateWithoutSentMessagesInputSchema';

export const WechatUserCreateOrConnectWithoutSentMessagesInputSchema: z.ZodType<Prisma.WechatUserCreateOrConnectWithoutSentMessagesInput> = z.object({
  where: z.lazy(() => WechatUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutSentMessagesInputSchema) ]),
}).strict();

export default WechatUserCreateOrConnectWithoutSentMessagesInputSchema;
