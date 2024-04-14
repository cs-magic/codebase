import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPlatformTypeFilterSchema } from './NestedEnumPlatformTypeFilterSchema';

export const NestedEnumPlatformTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPlatformTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PlatformTypeSchema).optional(),
  in: z.lazy(() => PlatformTypeSchema).array().optional(),
  notIn: z.lazy(() => PlatformTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => NestedEnumPlatformTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPlatformTypeFilterSchema).optional()
}).strict();

export default NestedEnumPlatformTypeWithAggregatesFilterSchema;
