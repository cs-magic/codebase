import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutRoomInputSchema } from './WechatMessageCreateWithoutRoomInputSchema';
import { WechatMessageUncheckedCreateWithoutRoomInputSchema } from './WechatMessageUncheckedCreateWithoutRoomInputSchema';
import { WechatMessageCreateOrConnectWithoutRoomInputSchema } from './WechatMessageCreateOrConnectWithoutRoomInputSchema';
import { WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema } from './WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema';
import { WechatMessageCreateManyRoomInputEnvelopeSchema } from './WechatMessageCreateManyRoomInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';
import { WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema } from './WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema';
import { WechatMessageUpdateManyWithWhereWithoutRoomInputSchema } from './WechatMessageUpdateManyWithWhereWithoutRoomInputSchema';
import { WechatMessageScalarWhereInputSchema } from './WechatMessageScalarWhereInputSchema';

export const WechatMessageUncheckedUpdateManyWithoutRoomNestedInputSchema: z.ZodType<Prisma.WechatMessageUncheckedUpdateManyWithoutRoomNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageCreateWithoutRoomInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => WechatMessageUpsertWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyRoomInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema),z.lazy(() => WechatMessageUpdateWithWhereUniqueWithoutRoomInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WechatMessageUpdateManyWithWhereWithoutRoomInputSchema),z.lazy(() => WechatMessageUpdateManyWithWhereWithoutRoomInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WechatMessageScalarWhereInputSchema),z.lazy(() => WechatMessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageUncheckedUpdateManyWithoutRoomNestedInputSchema;
