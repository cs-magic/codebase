import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { EnumPlatformTypeWithAggregatesFilterSchema } from './EnumPlatformTypeWithAggregatesFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { JsonNullableListFilterSchema } from './JsonNullableListFilterSchema';

export const CardScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CardScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardScalarWhereWithAggregatesInputSchema),z.lazy(() => CardScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  platformType: z.union([ z.lazy(() => EnumPlatformTypeWithAggregatesFilterSchema),z.lazy(() => PlatformTypeSchema) ]).optional(),
  platformId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  platformData: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  sourceUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  author: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cover: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  images: z.lazy(() => JsonNullableListFilterSchema).optional(),
  iFrames: z.lazy(() => JsonNullableListFilterSchema).optional(),
  videos: z.lazy(() => JsonNullableListFilterSchema).optional(),
  contentMd: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contentSummary: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  stat: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  ossUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export default CardScalarWhereWithAggregatesInputSchema;
