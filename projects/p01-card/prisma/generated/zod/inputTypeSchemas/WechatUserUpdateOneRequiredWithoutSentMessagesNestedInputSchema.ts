import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutSentMessagesInputSchema } from './WechatUserCreateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutSentMessagesInputSchema } from './WechatUserUncheckedCreateWithoutSentMessagesInputSchema';
import { WechatUserCreateOrConnectWithoutSentMessagesInputSchema } from './WechatUserCreateOrConnectWithoutSentMessagesInputSchema';
import { WechatUserUpsertWithoutSentMessagesInputSchema } from './WechatUserUpsertWithoutSentMessagesInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserUpdateToOneWithWhereWithoutSentMessagesInputSchema } from './WechatUserUpdateToOneWithWhereWithoutSentMessagesInputSchema';
import { WechatUserUpdateWithoutSentMessagesInputSchema } from './WechatUserUpdateWithoutSentMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutSentMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutSentMessagesInputSchema';

export const WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema: z.ZodType<Prisma.WechatUserUpdateOneRequiredWithoutSentMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutSentMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutSentMessagesInputSchema).optional(),
  upsert: z.lazy(() => WechatUserUpsertWithoutSentMessagesInputSchema).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WechatUserUpdateToOneWithWhereWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUpdateWithoutSentMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutSentMessagesInputSchema) ]).optional(),
}).strict();

export default WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema;
