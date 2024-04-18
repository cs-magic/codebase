import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { InputJsonValueSchema } from './InputJsonValueSchema';
import { PlatformTypeSchema } from './PlatformTypeSchema';
import { EnumPlatformTypeFieldUpdateOperationsInputSchema } from './EnumPlatformTypeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { CardUpdateimagesInputSchema } from './CardUpdateimagesInputSchema';
import { CardUpdateiFramesInputSchema } from './CardUpdateiFramesInputSchema';
import { CardUpdatevideosInputSchema } from './CardUpdatevideosInputSchema';

export const CardUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CardUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  platformType: z.union([ z.lazy(() => PlatformTypeSchema),z.lazy(() => EnumPlatformTypeFieldUpdateOperationsInputSchema) ]).optional(),
  platformId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  platformData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  sourceUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cover: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  images: z.union([ z.lazy(() => CardUpdateimagesInputSchema),InputJsonValueSchema.array() ]).optional(),
  iFrames: z.union([ z.lazy(() => CardUpdateiFramesInputSchema),InputJsonValueSchema.array() ]).optional(),
  videos: z.union([ z.lazy(() => CardUpdatevideosInputSchema),InputJsonValueSchema.array() ]).optional(),
  contentMd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contentSummary: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stat: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  ossUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export default CardUncheckedUpdateManyInputSchema;
