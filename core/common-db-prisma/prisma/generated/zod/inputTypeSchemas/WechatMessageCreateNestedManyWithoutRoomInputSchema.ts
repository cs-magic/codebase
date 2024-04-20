import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateWithoutRoomInputSchema } from './WechatMessageCreateWithoutRoomInputSchema';
import { WechatMessageUncheckedCreateWithoutRoomInputSchema } from './WechatMessageUncheckedCreateWithoutRoomInputSchema';
import { WechatMessageCreateOrConnectWithoutRoomInputSchema } from './WechatMessageCreateOrConnectWithoutRoomInputSchema';
import { WechatMessageCreateManyRoomInputEnvelopeSchema } from './WechatMessageCreateManyRoomInputEnvelopeSchema';
import { WechatMessageWhereUniqueInputSchema } from './WechatMessageWhereUniqueInputSchema';

export const WechatMessageCreateNestedManyWithoutRoomInputSchema: z.ZodType<Prisma.WechatMessageCreateNestedManyWithoutRoomInput> = z.object({
  create: z.union([ z.lazy(() => WechatMessageCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageCreateWithoutRoomInputSchema).array(),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema),z.lazy(() => WechatMessageUncheckedCreateWithoutRoomInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WechatMessageCreateOrConnectWithoutRoomInputSchema),z.lazy(() => WechatMessageCreateOrConnectWithoutRoomInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WechatMessageCreateManyRoomInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WechatMessageWhereUniqueInputSchema),z.lazy(() => WechatMessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default WechatMessageCreateNestedManyWithoutRoomInputSchema;
