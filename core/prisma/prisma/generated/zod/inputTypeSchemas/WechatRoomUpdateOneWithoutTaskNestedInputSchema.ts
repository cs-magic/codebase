import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateWithoutTaskInputSchema } from './WechatRoomCreateWithoutTaskInputSchema';
import { WechatRoomUncheckedCreateWithoutTaskInputSchema } from './WechatRoomUncheckedCreateWithoutTaskInputSchema';
import { WechatRoomCreateOrConnectWithoutTaskInputSchema } from './WechatRoomCreateOrConnectWithoutTaskInputSchema';
import { WechatRoomUpsertWithoutTaskInputSchema } from './WechatRoomUpsertWithoutTaskInputSchema';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';
import { WechatRoomWhereUniqueInputSchema } from './WechatRoomWhereUniqueInputSchema';
import { WechatRoomUpdateToOneWithWhereWithoutTaskInputSchema } from './WechatRoomUpdateToOneWithWhereWithoutTaskInputSchema';
import { WechatRoomUpdateWithoutTaskInputSchema } from './WechatRoomUpdateWithoutTaskInputSchema';
import { WechatRoomUncheckedUpdateWithoutTaskInputSchema } from './WechatRoomUncheckedUpdateWithoutTaskInputSchema';

export const WechatRoomUpdateOneWithoutTaskNestedInputSchema: z.ZodType<Prisma.WechatRoomUpdateOneWithoutTaskNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatRoomCreateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedCreateWithoutTaskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatRoomCreateOrConnectWithoutTaskInputSchema).optional(),
  upsert: z.lazy(() => WechatRoomUpsertWithoutTaskInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WechatRoomWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WechatRoomWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WechatRoomWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WechatRoomUpdateToOneWithWhereWithoutTaskInputSchema),z.lazy(() => WechatRoomUpdateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutTaskInputSchema) ]).optional(),
}).strict();

export default WechatRoomUpdateOneWithoutTaskNestedInputSchema;
