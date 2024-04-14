import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';

export const NestedEnumPlatformTypeFilterSchema: z.ZodType<Prisma.NestedEnumPlatformTypeFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeFilterSchema) ]).optional(),
}).strict();

export default NestedEnumPlatformTypeFilterSchema;
