import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NestedEnumPlatformTypeFilterSchema } from './NestedEnumPlatformTypeFilterSchema';

export const EnumPlatformTypeFilterSchema: z.ZodType<Prisma.EnumPlatformTypeFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeFilterSchema) ]).optional(),
}).strict();

export default EnumPlatformTypeFilterSchema;
