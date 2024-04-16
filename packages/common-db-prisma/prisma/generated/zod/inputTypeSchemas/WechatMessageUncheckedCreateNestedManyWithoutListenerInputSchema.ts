import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutListenerInputSchema } from './WechatMessageCreateWithoutListenerInputSchema';
import { WechatMessageUncheckedCreateWithoutListenerInputSchema } from './WechatMessageUncheckedCreateWithoutListenerInputSchema';
import { WechatMessageCreateOrConnectWithoutListenerInputSchema } from './WechatMessageCreateOrConnectWithoutListenerInputSchema';
import { WechatMessageCreateManyListenerInputEnvelopeSchema } from './WechatMessageCreateManyListenerInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';

export const WechatMessageUncheckedCreateNestedManyWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageUncheckedCreateNestedManyWithoutListenerInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageCreateWithoutListenerInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutListenerInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutListenerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyListenerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageUncheckedCreateNestedManyWithoutListenerInputSchema;
