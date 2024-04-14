import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatMessageWhereInputSchema } from '../inputTypeSchemas/WechatMessageWhereInputSchema'

export const WechatMessageDeleteManyArgsSchema: z.ZodType<Prisma.WechatMessageDeleteManyArgs> = z.object({
  where: WechatMessageWhereInputSchema.optional(),
}).strict() ;

export default WechatMessageDeleteManyArgsSchema;
