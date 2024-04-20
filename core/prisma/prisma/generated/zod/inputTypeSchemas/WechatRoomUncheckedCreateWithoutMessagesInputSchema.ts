import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatRoomCreateadminIdListInputSchema } from './WechatRoomCreateadminIdListInputSchema';
import { WechatRoomCreatememberIdListInputSchema } from './WechatRoomCreatememberIdListInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { TaskUncheckedCreateNestedManyWithoutRoomInputSchema } from './TaskUncheckedCreateNestedManyWithoutRoomInputSchema';

export const WechatRoomUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.WechatRoomUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  adminIdList: z.union([ z.lazy(() => WechatRoomCreateadminIdListInputSchema),z.string().array() ]).optional(),
  memberIdList: z.union([ z.lazy(() => WechatRoomCreatememberIdListInputSchema),z.string().array() ]).optional(),
  avatar: z.string().optional().nullable(),
  topic: z.string().optional().nullable(),
  ownerId: z.string().optional().nullable(),
  preference: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  Task: z.lazy(() => TaskUncheckedCreateNestedManyWithoutRoomInputSchema).optional()
}).strict();

export default WechatRoomUncheckedCreateWithoutMessagesInputSchema;
