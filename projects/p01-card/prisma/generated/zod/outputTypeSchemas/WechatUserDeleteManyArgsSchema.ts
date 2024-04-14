import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserWhereInputSchema } from '../inputTypeSchemas/WechatUserWhereInputSchema'

export const WechatUserDeleteManyArgsSchema: z.ZodType<Prisma.WechatUserDeleteManyArgs> = z.object({
  where: WechatUserWhereInputSchema.optional(),
}).strict() ;

export default WechatUserDeleteManyArgsSchema;
