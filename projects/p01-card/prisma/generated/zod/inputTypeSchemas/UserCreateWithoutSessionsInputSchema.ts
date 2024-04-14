import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  wxid: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  wxidVerified: z.coerce.date().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutSessionsInputSchema;
