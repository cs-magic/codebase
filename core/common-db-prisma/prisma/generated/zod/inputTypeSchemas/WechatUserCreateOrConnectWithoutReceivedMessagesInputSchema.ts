import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserCreateWithoutReceivedMessagesInputSchema } from './WechatUserCreateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema';

export const WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.WechatUserCreateOrConnectWithoutReceivedMessagesInput> = z.object({
  where: z.lazy(() => WechatUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
}).strict();

export default WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema;
