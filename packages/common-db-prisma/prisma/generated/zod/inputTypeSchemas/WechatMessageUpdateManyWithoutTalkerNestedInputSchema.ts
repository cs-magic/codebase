import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutTalkerInputSchema } from './WechatMessageCreateWithoutTalkerInputSchema';
import { WechatMessageUncheckedCreateWithoutTalkerInputSchema } from './WechatMessageUncheckedCreateWithoutTalkerInputSchema';
import { WechatMessageCreateOrConnectWithoutTalkerInputSchema } from './WechatMessageCreateOrConnectWithoutTalkerInputSchema';
import { WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema } from './WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema';
import { WechatMessageCreateManyTalkerInputEnvelopeSchema } from './WechatMessageCreateManyTalkerInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema } from './WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema';
import { WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema } from './WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';

export const WechatMessageUpdateManyWithoutTalkerNestedInputSchema: z.ZodType<Prisma.WechatMessageUpdateManyWithoutTalkerNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageCreateWithoutTalkerInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutTalkerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutTalkerInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutTalkerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema),z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutTalkerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyTalkerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema),z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutTalkerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema),z.lazy(() => WechatMessageUpdateManyWithWhereWithoutTalkerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WechatMessageScalarWhereInputSchema),z.lazy(() => WechatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageUpdateManyWithoutTalkerNestedInputSchema;
