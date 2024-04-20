import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomUpdateManyMutationInputSchema } from '../inputTypeSchemas/WechatRoomUpdateManyMutationInputSchema'
import { WechatRoomUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/WechatRoomUncheckedUpdateManyInputSchema'
import { WechatRoomWhereInputSchema } from '../inputTypeSchemas/WechatRoomWhereInputSchema'

export const WechatRoomUpdateManyArgsSchema: z.ZodType<Prisma.WechatRoomUpdateManyArgs> = z.object({
  data: z.union([ WechatRoomUpdateManyMutationInputSchema,WechatRoomUncheckedUpdateManyInputSchema ]),
  where: WechatRoomWhereInputSchema.optional(),
}).strict() ;

export default WechatRoomUpdateManyArgsSchema;
