import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountWhereUniqueInputSchema } from './AccountWhereUniqueInputSchema';
import { AccountUpdateWithoutUserInputSchema } from './AccountUpdateWithoutUserInputSchema';
import { AccountUncheckedUpdateWithoutUserInputSchema } from './AccountUncheckedUpdateWithoutUserInputSchema';
import { AccountCreateWithoutUserInputSchema } from './AccountCreateWithoutUserInputSchema';
import { AccountUncheckedCreateWithoutUserInputSchema } from './AccountUncheckedCreateWithoutUserInputSchema';

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default AccountUpsertWithWhereUniqueWithoutUserInputSchema;
