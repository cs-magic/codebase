import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountScalarWhereInputSchema } from './AccountScalarWhereInputSchema';
import { AccountUpdateManyMutationInputSchema } from './AccountUpdateManyMutationInputSchema';
import { AccountUncheckedUpdateManyWithoutUserInputSchema } from './AccountUncheckedUpdateManyWithoutUserInputSchema';

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default AccountUpdateManyWithWhereWithoutUserInputSchema;
