import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountWhereUniqueInputSchema } from './AccountWhereUniqueInputSchema';
import { AccountCreateWithoutUserInputSchema } from './AccountCreateWithoutUserInputSchema';
import { AccountUncheckedCreateWithoutUserInputSchema } from './AccountUncheckedCreateWithoutUserInputSchema';

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AccountCreateOrConnectWithoutUserInputSchema;
