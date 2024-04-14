import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { EnumPlatformTypeFilterSchema } from './EnumPlatformTypeFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { JsonNullableListFilterSchema } from './JsonNullableListFilterSchema';

export const CardWhereInputSchema: z.ZodType<Prisma.CardWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.lazy(() => JsonNullableFilterSchema).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  platformData: z.lazy(() => JsonNullableFilterSchema).optional(),
  sourceUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  author: z.lazy(() => JsonNullableFilterSchema).optional(),
  time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cover: z.lazy(() => JsonNullableFilterSchema).optional(),
  images: z.lazy(() => JsonNullableListFilterSchema).optional(),
  iFrames: z.lazy(() => JsonNullableListFilterSchema).optional(),
  videos: z.lazy(() => JsonNullableListFilterSchema).optional(),
  contentMd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contentSummary: z.lazy(() => JsonNullableFilterSchema).optional(),
  stat: z.lazy(() => JsonNullableFilterSchema).optional(),
  ossUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default CardWhereInputSchema;
