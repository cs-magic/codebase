import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserCreateWithoutTasksInputSchema } from './WechatUserCreateWithoutTasksInputSchema';
import { WechatUserUncheckedCreateWithoutTasksInputSchema } from './WechatUserUncheckedCreateWithoutTasksInputSchema';

export const WechatUserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.WechatUserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => WechatUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WechatUserCreateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export default WechatUserCreateOrConnectWithoutTasksInputSchema;
