import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatUserUpdateManyMutationInputSchema } from '../inputTypeSchemas/WechatUserUpdateManyMutationInputSchema'
import { WechatUserUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WechatUserUncheckedUpdateManyInputSchema'
import { WechatUserWhereInputSchema } from '../inputTypeSchemas/WechatUserWhereInputSchema'

export const WechatUserUpdateManyArgsSchema: z.ZodType<Prisma.WechatUserUpdateManyArgs> = z.object({
  data: z.union([ WechatUserUpdateManyMutationInputSchema,WechatUserUncheckedUpdateManyInputSchema ]),
  where: WechatUserWhereInputSchema.optional(),
}).strict() ;

export default WechatUserUpdateManyArgsSchema;
