import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SessionIncludeSchema } from '../inputTypeSchemas/SessionIncludeSchema'
import { SessionWhereUniqueInputSchema } from '../inputTypeSchemas/SessionWhereUniqueInputSchema'
import { SessionCreateInputSchema } from '../inputTypeSchemas/SessionCreateInputSchema'
import { SessionUncheckedCreateInputSchema } from '../inputTypeSchemas/SessionUncheckedCreateInputSchema'
import { SessionUpdateInputSchema } from '../inputTypeSchemas/SessionUpdateInputSchema'
import { SessionUncheckedUpdateInputSchema } from '../inputTypeSchemas/SessionUncheckedUpdateInputSchema'
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

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export default SessionUpsertArgsSchema;
