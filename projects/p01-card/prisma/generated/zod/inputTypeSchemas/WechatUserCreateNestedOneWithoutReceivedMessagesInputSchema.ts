import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutReceivedMessagesInputSchema } from './WechatUserCreateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema } from './WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';

export const WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema: z.ZodType<Prisma.WechatUserCreateNestedOneWithoutReceivedMessagesInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional()
}).strict();

export default WechatUserCreateNestedOneWithoutReceivedMessagesInputSchema;
