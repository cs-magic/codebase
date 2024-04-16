import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateManyRoomInputSchema } from './WechatMessageCreateManyRoomInputSchema';

export const WechatMessageCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.WechatMessageCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WechatMessageCreateManyRoomInputSchema),z.lazy(() => WechatMessageCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default WechatMessageCreateManyRoomInputEnvelopeSchema;
