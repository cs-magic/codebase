import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutAccountsInputSchema } from './UserCreateWithoutAccountsInputSchema';
import { UserUncheckedCreateWithoutAccountsInputSchema } from './UserUncheckedCreateWithoutAccountsInputSchema';
import { UserCreateOrConnectWithoutAccountsInputSchema } from './UserCreateOrConnectWithoutAccountsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutAccountsInputSchema;
