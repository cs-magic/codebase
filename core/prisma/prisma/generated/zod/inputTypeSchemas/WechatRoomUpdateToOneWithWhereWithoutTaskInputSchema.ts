import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';
import { WechatRoomUpdateWithoutTaskInputSchema } from './WechatRoomUpdateWithoutTaskInputSchema';
import { WechatRoomUncheckedUpdateWithoutTaskInputSchema } from './WechatRoomUncheckedUpdateWithoutTaskInputSchema';

export const WechatRoomUpdateToOneWithWhereWithoutTaskInputSchema: z.ZodType<Prisma.WechatRoomUpdateToOneWithWhereWithoutTaskInput> = z.object({
  where: z.lazy(() => WechatRoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WechatRoomUpdateWithoutTaskInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutTaskInputSchema) ]),
}).strict();

export default WechatRoomUpdateToOneWithWhereWithoutTaskInputSchema;
