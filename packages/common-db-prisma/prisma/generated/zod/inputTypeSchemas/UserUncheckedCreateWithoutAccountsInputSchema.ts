import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().optional(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  wxid: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  phoneVerified: z.coerce.date().optional().nullable(),
  wxidVerified: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutAccountsInputSchema;
