import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const CardMinOrderByAggregateInputSchema: z.ZodType<Prisma.CardMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.lazy(() => SortOrderSchema).optional(),
  sourceUrl: z.lazy(() => SortOrderSchema).optional(),
  time: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  contentMd: z.lazy(() => SortOrderSchema).optional(),
  ossUrl: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default CardMinOrderByAggregateInputSchema;
