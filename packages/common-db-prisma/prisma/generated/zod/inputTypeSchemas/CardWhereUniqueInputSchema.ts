import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { CardPlatformTypePlatformIdCompoundUniqueInputSchema } from './CardPlatformTypePlatformIdCompoundUniqueInputSchema';
import { CardWhereInputSchema } from './CardWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { EnumPlatformTypeFilterSchema } from './EnumPlatformTypeFilterSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { JsonNullableListFilterSchema } from './JsonNullableListFilterSchema';

export const CardWhereUniqueInputSchema: z.ZodType<Prisma.CardWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    platformType_platformId: z.lazy(() => CardPlatformTypePlatformIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    platformType_platformId: z.lazy(() => CardPlatformTypePlatformIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  platformType_platformId: z.lazy(() => CardPlatformTypePlatformIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CardWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CardWhereInputSchema),z.lazy(() => CardWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
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
}).strict());

export default CardWhereUniqueInputSchema;
