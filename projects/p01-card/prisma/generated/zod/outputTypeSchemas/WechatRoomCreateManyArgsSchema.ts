import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { WechatRoomCreateManyInputSchema } from '../inputTypeSchemas/WechatRoomCreateManyInputSchema'

export const WechatRoomCreateManyArgsSchema: z.ZodType<Prisma.WechatRoomCreateManyArgs> = z.object({
  data: z.union([ WechatRoomCreateManyInputSchema,WechatRoomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default WechatRoomCreateManyArgsSchema;
