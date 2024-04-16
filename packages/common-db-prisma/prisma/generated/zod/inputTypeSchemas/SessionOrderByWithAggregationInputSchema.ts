import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SessionCountOrderByAggregateInputSchema } from './SessionCountOrderByAggregateInputSchema';
import { SessionMaxOrderByAggregateInputSchema } from './SessionMaxOrderByAggregateInputSchema';
import { SessionMinOrderByAggregateInputSchema } from './SessionMinOrderByAggregateInputSchema';

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export default SessionOrderByWithAggregationInputSchema;
