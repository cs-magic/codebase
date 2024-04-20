import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { WechatUserCreateWithoutTasksInputSchema } from './WechatUserCreateWithoutTasksInputSchema';
import { WechatUserUncheckedCreateWithoutTasksInputSchema } from './WechatUserUncheckedCreateWithoutTasksInputSchema';
import { WechatUserCreateOrConnectWithoutTasksInputSchema } from './WechatUserCreateOrConnectWithoutTasksInputSchema';
import { WechatUserUpsertWithoutTasksInputSchema } from './WechatUserUpsertWithoutTasksInputSchema';
import { WechatUserWhereInputSchema } from './WechatUserWhereInputSchema';
import { WechatUserWhereUniqueInputSchema } from './WechatUserWhereUniqueInputSchema';
import { WechatUserUpdateToOneWithWhereWithoutTasksInputSchema } from './WechatUserUpdateToOneWithWhereWithoutTasksInputSchema';
import { WechatUserUpdateWithoutTasksInputSchema } from './WechatUserUpdateWithoutTasksInputSchema';
import { WechatUserUncheckedUpdateWithoutTasksInputSchema } from './WechatUserUncheckedUpdateWithoutTasksInputSchema';

export const WechatUserUpdateOneWithoutTasksNestedInputSchema: z.ZodType<Prisma.WechatUserUpdateOneWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => WechatUserCreateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WechatUserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => WechatUserUpsertWithoutTasksInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WechatUserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WechatUserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WechatUserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => WechatUserUpdateWithoutTasksInputSchema),z.lazy(() => WechatUserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export default WechatUserUpdateOneWithoutTasksNestedInputSchema;
