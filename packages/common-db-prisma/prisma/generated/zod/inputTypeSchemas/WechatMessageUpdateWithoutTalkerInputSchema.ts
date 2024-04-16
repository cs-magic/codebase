import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { WechatMessageUpdatementionIdListInputSchema } from './WechatMessageUpdatementionIdListInputSchema';
import { WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema } from './WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema';
import { WechatRoomUpdateOneWithoutMessagesNestedInputSchema } from './WechatRoomUpdateOneWithoutMessagesNestedInputSchema';

export const WechatMessageUpdateWithoutTalkerInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithoutTalkerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  timestamp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageUpdatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  listener: z.lazy(() => WechatUserUpdateOneWithoutReceivedMessagesNestedInputSchema).optional(),
  room: z.lazy(() => WechatRoomUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export default WechatMessageUpdateWithoutTalkerInputSchema;
