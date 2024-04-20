import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomWhereInputSchema } from './WechatRoomWhereInputSchema';
import { WechatRoomUpdateWithoutMessagesInputSchema } from './WechatRoomUpdateWithoutMessagesInputSchema';
import { WechatRoomUncheckedUpdateWithoutMessagesInputSchema } from './WechatRoomUncheckedUpdateWithoutMessagesInputSchema';

export const WechatRoomUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.WechatRoomUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => WechatRoomWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WechatRoomUpdateWithoutMessagesInputSchema),z.lazy(() => WechatRoomUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export default WechatRoomUpdateToOneWithWhereWithoutMessagesInputSchema;
