import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserCreateManyInputSchema } from '../inputTypeSchemas/WechatUserCreateManyInputSchema'

export const WechatUserCreateManyArgsSchema: z.ZodType<Prisma.WechatUserCreateManyArgs> = z.object({
  data: z.union([ WechatUserCreateManyInputSchema,WechatUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default WechatUserCreateManyArgsSchema;
