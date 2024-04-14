import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutListenerInputSchema } from './WechatMessageCreateWithoutListenerInputSchema';
import { WechatMessageUncheckedCreateWithoutListenerInputSchema } from './WechatMessageUncheckedCreateWithoutListenerInputSchema';
import { WechatMessageCreateOrConnectWithoutListenerInputSchema } from './WechatMessageCreateOrConnectWithoutListenerInputSchema';
import { WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema } from './WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema';
import { WechatMessageCreateManyListenerInputEnvelopeSchema } from './WechatMessageCreateManyListenerInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema } from './WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema';
import { WechatMessageUpdateManyWithWhereWithoutListenerInputSchema } from './WechatMessageUpdateManyWithWhereWithoutListenerInputSchema';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';

export const WechatMessageUpdateManyWithoutListenerNestedInputSchema: z.ZodType<Prisma.WechatMessageUpdateManyWithoutListenerNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageCreateWithoutListenerInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutListenerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutListenerInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutListenerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema),z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutListenerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyListenerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema),z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutListenerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WechatMessageUpdateManyWithWhereWithoutListenerInputSchema),z.lazy(() => WechatMessageUpdateManyWithWhereWithoutListenerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WechatMessageScalarWhereInputSchema),z.lazy(() => WechatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageUpdateManyWithoutListenerNestedInputSchema;
