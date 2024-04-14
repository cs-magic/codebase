import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';

export const CardPlatformTypePlatformIdCompoundUniqueInputSchema: z.ZodType<Prisma.CardPlatformTypePlatformIdCompoundUniqueInput> = z.object({
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string()
}).strict();

export default CardPlatformTypePlatformIdCompoundUniqueInputSchema;
