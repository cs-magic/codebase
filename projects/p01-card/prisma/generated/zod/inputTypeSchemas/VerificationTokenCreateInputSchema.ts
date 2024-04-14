import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export default VerificationTokenCreateInputSchema;
