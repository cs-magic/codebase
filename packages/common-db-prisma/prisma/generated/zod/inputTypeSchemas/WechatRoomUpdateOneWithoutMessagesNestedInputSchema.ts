import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateWithoutMessagesInputSchema } from './WechatRoomCreateWithoutMessagesInputSchema';
import { WechatRoomUncheckedCreateWithoutMessagesInputSchema } from './WechatRoomUncheckedCreateWithoutMessagesInputSchema';
import { WechatRoomCreateOrConnectWithoutMessagesInputSchema } from './WechatRoomCreateOrConnectWithoutMessagesInputSchema';
import { WechatRoomUpsertWithoutMessagesInputSchema } from './WechatRoomUpsertWithoutMessagesInputSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';
import { WechatRoomUpdateToOneWithWhereWithoutMessagesInputSchema } from './WechatRoomUpdateToOneWithWhereWithoutMessagesInputSchema';
import { WechatRoomUpdateWithoutMessagesInputSchema } from './WechatRoomUpdateWithoutMessagesInputSchema';
import { WechatRoomUncheckedUpdateWithoutMessagesInputSchema } from './WechatRoomUncheckedUpdateWithoutMessagesInputSchema';

export const WechatRoomUpdateOneWithoutMessagesNestedInputSchema: z.ZodType<Prisma.WechatRoomUpdateOneWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatRoomCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => WechatRoomUpsertWithoutMessagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WechatRoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WechatRoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WechatRoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WechatRoomUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => WechatRoomUpdateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export default WechatRoomUpdateOneWithoutMessagesNestedInputSchema;
