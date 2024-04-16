import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutTalkerInputSchema } from './WechatMessageCreateWithoutTalkerInputSchema';
import { WechatMessageUncheckedCreateWithoutTalkerInputSchema } from './WechatMessageUncheckedCreateWithoutTalkerInputSchema';
import { WechatMessageCreateOrConnectWithoutTalkerInputSchema } from './WechatMessageCreateOrConnectWithoutTalkerInputSchema';
import { WechatMessageCreateManyTalkerInputEnvelopeSchema } from './WechatMessageCreateManyTalkerInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';

export const WechatMessageUncheckedCreateNestedManyWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUncheckedCreateNestedManyWithoutTalkerInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutTalkerInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutTalkerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyTalkerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageUncheckedCreateNestedManyWithoutTalkerInputSchema;
