import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { WechatRoomUpdateadminIdListInputSchema } from './WechatRoomUpdateadminIdListInputSchema';
import { WechatRoomUpdatememberIdListInputSchema } from './WechatRoomUpdatememberIdListInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { WechatMessageUpdateManyWithoutRoomNestedInputSchema } from './WechatMessageUpdateManyWithoutRoomNestedInputSchema';
import { TaskUpdateManyWithoutRoomNestedInputSchema } from './TaskUpdateManyWithoutRoomNestedInputSchema';

export const WechatRoomUpdateInputSchema: z.ZodType<Prisma.WechatRoomUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  adminIdList: z.union([ z.lazy(() => WechatRoomUpdateadminIdListInputSchema),z.string().array() ]).optional(),
  memberIdList: z.union([ z.lazy(() => WechatRoomUpdatememberIdListInputSchema),z.string().array() ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  topic: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  preference: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  data: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  messages: z.lazy(() => WechatMessageUpdateManyWithoutRoomNestedInputSchema).optional(),
  Task: z.lazy(() => TaskUpdateManyWithoutRoomNestedInputSchema).optional()
}).strict();

export default WechatRoomUpdateInputSchema;
