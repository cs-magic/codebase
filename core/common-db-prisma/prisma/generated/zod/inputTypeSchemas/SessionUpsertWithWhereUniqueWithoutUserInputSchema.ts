import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionWhereUniqueInputSchema } from './SessionWhereUniqueInputSchema';
import { SessionUpdateWithoutUserInputSchema } from './SessionUpdateWithoutUserInputSchema';
import { SessionUncheckedUpdateWithoutUserInputSchema } from './SessionUncheckedUpdateWithoutUserInputSchema';
import { SessionCreateWithoutUserInputSchema } from './SessionCreateWithoutUserInputSchema';
import { SessionUncheckedCreateWithoutUserInputSchema } from './SessionUncheckedCreateWithoutUserInputSchema';

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default SessionUpsertWithWhereUniqueWithoutUserInputSchema;
