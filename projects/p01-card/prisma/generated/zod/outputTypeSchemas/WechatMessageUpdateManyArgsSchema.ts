import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageUpdateManyMutationInputSchema } from '../inputTypeSchemas/WechatMessageUpdateManyMutationInputSchema'
import { WechatMessageUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WechatMessageUncheckedUpdateManyInputSchema'
import { WechatMessageWhereInputSchema } from '../inputTypeSchemas/WechatMessageWhereInputSchema'

export const WechatMessageUpdateManyArgsSchema: z.ZodType<Prisma.WechatMessageUpdateManyArgs> = z.object({
  data: z.union([ WechatMessageUpdateManyMutationInputSchema,WechatMessageUncheckedUpdateManyInputSchema ]),
  where: WechatMessageWhereInputSchema.optional(),
}).strict() ;

export default WechatMessageUpdateManyArgsSchema;
