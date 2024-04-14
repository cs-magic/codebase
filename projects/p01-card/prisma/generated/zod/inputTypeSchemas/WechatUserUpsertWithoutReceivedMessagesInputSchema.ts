import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUpdateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema';
import { WechatUserCreateWithoutReceivedMessagesInputSchema } from './WechatUserCreateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const WechatUserUpsertWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.WechatUserUpsertWithoutReceivedMessagesInput> = z.object({
  update: z.union([ z.lazy(() => WechatUserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema) ]),
  where: z.lazy(() => WechatUserWhereInputSchema).optional()
}).strict();

export default WechatUserUpsertWithoutReceivedMessagesInputSchema;
