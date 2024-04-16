import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionCreateManyInputSchema } from '../inputTypeSchemas/SessionCreateManyInputSchema'

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default SessionCreateManyArgsSchema;
