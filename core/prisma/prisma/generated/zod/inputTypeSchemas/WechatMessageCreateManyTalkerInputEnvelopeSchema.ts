import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatMessageCreateManyTalkerInputSchema } from './WechatMessageCreateManyTalkerInputSchema';

export const WechatMessageCreateManyTalkerInputEnvelopeSchema: z.ZodType<Prisma.WechatMessageCreateManyTalkerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WechatMessageCreateManyTalkerInputSchema),z.lazy(() => WechatMessageCreateManyTalkerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default WechatMessageCreateManyTalkerInputEnvelopeSchema;
