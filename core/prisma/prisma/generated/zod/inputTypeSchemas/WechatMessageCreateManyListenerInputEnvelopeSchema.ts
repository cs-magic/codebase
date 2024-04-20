import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateManyListenerInputSchema } from './WechatMessageCreateManyListenerInputSchema';

export const WechatMessageCreateManyListenerInputEnvelopeSchema: z.ZodType<Prisma.WechatMessageCreateManyListenerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WechatMessageCreateManyListenerInputSchema),z.lazy(() => WechatMessageCreateManyListenerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default WechatMessageCreateManyListenerInputEnvelopeSchema;
