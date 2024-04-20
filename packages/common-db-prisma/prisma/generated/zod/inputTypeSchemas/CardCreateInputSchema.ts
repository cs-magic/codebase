import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { CardCreateimagesInputSchema } from './CardCreateimagesInputSchema';
import { CardCreateiFramesInputSchema } from './CardCreateiFramesInputSchema';
import { CardCreatevideosInputSchema } from './CardCreatevideosInputSchema';

export const CardCreateInputSchema: z.ZodType<Prisma.CardCreateInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  platformType: z.lazy(() => PlatformTypeSchema),
  platformId: z.string().optional().nullable(),
  platformData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  sourceUrl: z.string().optional().nullable(),
  author: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  time: z.coerce.date().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  cover: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  images: z.union([ z.lazy(() => CardCreateimagesInputSchema),InputJsonValueSchema.array() ]).optional(),
  iFrames: z.union([ z.lazy(() => CardCreateiFramesInputSchema),InputJsonValueSchema.array() ]).optional(),
  videos: z.union([ z.lazy(() => CardCreatevideosInputSchema),InputJsonValueSchema.array() ]).optional(),
  html: z.string().optional().nullable(),
  contentMd: z.string().optional().nullable(),
  contentSummary: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stat: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  ossUrl: z.string().optional().nullable()
}).strict();

export default CardCreateInputSchema;
