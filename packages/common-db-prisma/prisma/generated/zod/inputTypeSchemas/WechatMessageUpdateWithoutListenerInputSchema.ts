import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { WechatMessageUpdatementionIdListInputSchema } from './WechatMessageUpdatementionIdListInputSchema';
import { WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema } from './WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema';
import { WechatRoomUpdateOneWithoutMessagesNestedInputSchema } from './WechatRoomUpdateOneWithoutMessagesNestedInputSchema';

export const WechatMessageUpdateWithoutListenerInputSchema: z.ZodType<Prisma.WechatMessageUpdateWithoutListenerInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  timestamp: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mentionIdList: z.union([ z.lazy(() => WechatMessageUpdatementionIdListInputSchema),z.string().array() ]).optional(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  talker: z.lazy(() => WechatUserUpdateOneRequiredWithoutSentMessagesNestedInputSchema).optional(),
  room: z.lazy(() => WechatRoomUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export default WechatMessageUpdateWithoutListenerInputSchema;
