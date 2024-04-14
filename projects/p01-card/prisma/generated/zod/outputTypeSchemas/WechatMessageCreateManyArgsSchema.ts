import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageCreateManyInputSchema } from '../inputTypeSchemas/WechatMessageCreateManyInputSchema'

export const WechatMessageCreateManyArgsSchema: z.ZodType<Prisma.WechatMessageCreateManyArgs> = z.object({
  data: z.union([ WechatMessageCreateManyInputSchema,WechatMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default WechatMessageCreateManyArgsSchema;
