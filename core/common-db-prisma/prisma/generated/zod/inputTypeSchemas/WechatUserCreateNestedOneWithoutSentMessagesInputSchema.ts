import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutSentMessagesInputSchema } from './WechatUserCreateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutSentMessagesInputSchema } from './WechatUserUncheckedCreateWithoutSentMessagesInputSchema';
import { WechatUserCreateOrConnectWithoutSentMessagesInputSchema } from './WechatUserCreateOrConnectWithoutSentMessagesInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';

export const WechatUserCreateNestedOneWithoutSentMessagesInputSchema: z.ZodType<Prisma.WechatUserCreateNestedOneWithoutSentMessagesInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional()
}).strict();

export default WechatUserCreateNestedOneWithoutSentMessagesInputSchema;
