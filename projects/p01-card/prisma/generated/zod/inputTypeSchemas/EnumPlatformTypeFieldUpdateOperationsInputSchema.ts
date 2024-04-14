import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';

export const EnumPlatformTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPlatformTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PlatformTypeSchema).optional()
}).strict();

export default EnumPlatformTypeFieldUpdateOperationsInputSchema;
