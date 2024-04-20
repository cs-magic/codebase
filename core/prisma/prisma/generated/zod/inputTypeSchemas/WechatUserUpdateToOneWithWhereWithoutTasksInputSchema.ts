import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserUpdateWithoutTasksInputSchema } from './WechatUserUpdateWithoutTasksInputSchema';
import { WechatUserUncheckedUpdateWithoutTasksInputSchema } from './WechatUserUncheckedUpdateWithoutTasksInputSchema';

export const WechatUserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.WechatUserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => WechatUserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WechatUserUpdateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export default WechatUserUpdateToOneWithWhereWithoutTasksInputSchema;
