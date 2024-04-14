import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionSelectSchema } from '../inputTypeSchemas/SessionSelectSchema';
import { SessionIncludeSchema } from '../inputTypeSchemas/SessionIncludeSchema';

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export default SessionArgsSchema;
