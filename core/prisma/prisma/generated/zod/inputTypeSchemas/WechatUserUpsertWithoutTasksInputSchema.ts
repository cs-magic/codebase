import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserUpdateWithoutTasksInputSchema } from './WechatUserUpdateWithoutTasksInputSchema';
import { WechatUserUncheckedUpdateWithoutTasksInputSchema } from './WechatUserUncheckedUpdateWithoutTasksInputSchema';
import { WechatUserCreateWithoutTasksInputSchema } from './WechatUserCreateWithoutTasksInputSchema';
import { WechatUserUncheckedCreateWithoutTasksInputSchema } from './WechatUserUncheckedCreateWithoutTasksInputSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';

export const WechatUserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.WechatUserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => WechatUserUpdateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => WechatUserWhereInputSchema).optional()
}).strict();

export default WechatUserUpsertWithoutTasksInputSchema;
