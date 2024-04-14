import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export default SessionCreateManyInputSchema;
