import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionScalarWhereInputSchema } from './SessionScalarWhereInputSchema';
import { SessionUpdateManyMutationInputSchema } from './SessionUpdateManyMutationInputSchema';
import { SessionUncheckedUpdateManyWithoutUserInputSchema } from './SessionUncheckedUpdateManyWithoutUserInputSchema';

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default SessionUpdateManyWithWhereWithoutUserInputSchema;
