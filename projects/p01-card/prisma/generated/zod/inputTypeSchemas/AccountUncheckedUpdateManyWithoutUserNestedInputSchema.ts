import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountCreateWithoutUserInputSchema } from './AccountCreateWithoutUserInputSchema';
import { AccountUncheckedCreateWithoutUserInputSchema } from './AccountUncheckedCreateWithoutUserInputSchema';
import { AccountCreateOrConnectWithoutUserInputSchema } from './AccountCreateOrConnectWithoutUserInputSchema';
import { AccountUpsertWithWhereUniqueWithoutUserInputSchema } from './AccountUpsertWithWhereUniqueWithoutUserInputSchema';
import { AccountCreateManyUserInputEnvelopeSchema } from './AccountCreateManyUserInputEnvelopeSchema';
import { AccountWhereUniqueInputSchema } from './AccountWhereUniqueInputSchema';
import { AccountUpdateWithWhereUniqueWithoutUserInputSchema } from './AccountUpdateWithWhereUniqueWithoutUserInputSchema';
import { AccountUpdateManyWithWhereWithoutUserInputSchema } from './AccountUpdateManyWithWhereWithoutUserInputSchema';
import { AccountScalarWhereInputSchema } from './AccountScalarWhereInputSchema';

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default AccountUncheckedUpdateManyWithoutUserNestedInputSchema;
