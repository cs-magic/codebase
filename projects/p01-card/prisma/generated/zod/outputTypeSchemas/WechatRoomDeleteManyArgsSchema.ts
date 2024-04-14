import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomWhereInputSchema } from '../inputTypeSchemas/WechatRoomWhereInputSchema'

export const WechatRoomDeleteManyArgsSchema: z.ZodType<Prisma.WechatRoomDeleteManyArgs> = z.object({
  where: WechatRoomWhereInputSchema.optional(),
}).strict() ;

export default WechatRoomDeleteManyArgsSchema;
