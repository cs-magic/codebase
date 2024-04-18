import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { CardCountOrderByAggregateInputSchema } from './CardCountOrderByAggregateInputSchema';
import { CardMaxOrderByAggregateInputSchema } from './CardMaxOrderByAggregateInputSchema';
import { CardMinOrderByAggregateInputSchema } from './CardMinOrderByAggregateInputSchema';

export const CardOrderByWithAggregationInputSchema: z.ZodType<Prisma.CardOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  platformType: z.lazy(() => SortOrderSchema).optional(),
  platformId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  platformData: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sourceUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  author: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cover: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  iFrames: z.lazy(() => SortOrderSchema).optional(),
  videos: z.lazy(() => SortOrderSchema).optional(),
  contentMd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contentSummary: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stat: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ossUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CardCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CardMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CardMinOrderByAggregateInputSchema).optional()
}).strict();

export default CardOrderByWithAggregationInputSchema;
