import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSessionsInputSchema } from './UserUpdateWithoutSessionsInputSchema';
import { UserUncheckedUpdateWithoutSessionsInputSchema } from './UserUncheckedUpdateWithoutSessionsInputSchema';
import { UserCreateWithoutSessionsInputSchema } from './UserCreateWithoutSessionsInputSchema';
import { UserUncheckedCreateWithoutSessionsInputSchema } from './UserUncheckedCreateWithoutSessionsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutSessionsInputSchema;
