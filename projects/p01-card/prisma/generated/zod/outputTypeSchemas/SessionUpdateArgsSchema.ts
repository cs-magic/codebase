import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionIncludeSchema } from '../inputTypeSchemas/SessionIncludeSchema'
import { SessionUpdateInputSchema } from '../inputTypeSchemas/SessionUpdateInputSchema'
import { SessionUncheckedUpdateInputSchema } from '../inputTypeSchemas/SessionUncheckedUpdateInputSchema'
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export default SessionUpdateArgsSchema;
