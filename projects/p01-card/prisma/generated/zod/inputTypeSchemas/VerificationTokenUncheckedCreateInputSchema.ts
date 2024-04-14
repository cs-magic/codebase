import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export default VerificationTokenUncheckedCreateInputSchema;
