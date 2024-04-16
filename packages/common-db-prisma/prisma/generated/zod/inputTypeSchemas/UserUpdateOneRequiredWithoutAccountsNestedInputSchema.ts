import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAccountsInputSchema } from './UserCreateWithoutAccountsInputSchema';
import { UserUncheckedCreateWithoutAccountsInputSchema } from './UserUncheckedCreateWithoutAccountsInputSchema';
import { UserCreateOrConnectWithoutAccountsInputSchema } from './UserCreateOrConnectWithoutAccountsInputSchema';
import { UserUpsertWithoutAccountsInputSchema } from './UserUpsertWithoutAccountsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutAccountsInputSchema } from './UserUpdateToOneWithWhereWithoutAccountsInputSchema';
import { UserUpdateWithoutAccountsInputSchema } from './UserUpdateWithoutAccountsInputSchema';
import { UserUncheckedUpdateWithoutAccountsInputSchema } from './UserUncheckedUpdateWithoutAccountsInputSchema';

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutAccountsNestedInputSchema;
