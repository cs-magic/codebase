import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionWhereUniqueInputSchema } from './SessionWhereUniqueInputSchema';
import { SessionUpdateWithoutUserInputSchema } from './SessionUpdateWithoutUserInputSchema';
import { SessionUncheckedUpdateWithoutUserInputSchema } from './SessionUncheckedUpdateWithoutUserInputSchema';

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default SessionUpdateWithWhereUniqueWithoutUserInputSchema;
