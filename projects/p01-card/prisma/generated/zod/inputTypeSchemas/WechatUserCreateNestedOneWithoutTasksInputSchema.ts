import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutTasksInputSchema } from './WechatUserCreateWithoutTasksInputSchema';
import { WechatUserUncheckedCreateWithoutTasksInputSchema } from './WechatUserUncheckedCreateWithoutTasksInputSchema';
import { WechatUserCreateOrConnectWithoutTasksInputSchema } from './WechatUserCreateOrConnectWithoutTasksInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';

export const WechatUserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.WechatUserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional()
}).strict();

export default WechatUserCreateNestedOneWithoutTasksInputSchema;
