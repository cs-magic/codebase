import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutReceivedMessagesInputSchema } from './WechatUserCreateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema';
import { WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema } from './WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema';
import { WechatUserUpsertWithoutReceivedMessagesInputSchema } from './WechatUserUpsertWithoutReceivedMessagesInputSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema } from './WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema';
import { WechatUserUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUpdateWithoutReceivedMessagesInputSchema';
import { WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema } from './WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema';

export const WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema: z.ZodType<Prisma.WechatUserUpdateOneWithoutReceivedMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutReceivedMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutReceivedMessagesInputSchema).optional(),
  upsert: z.lazy(() => WechatUserUpsertWithoutReceivedMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WechatUserUpdateToOneWithWhereWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUpdateWithoutReceivedMessagesInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutReceivedMessagesInputSchema) ]).optional(),
}).strict();

export default WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema;
