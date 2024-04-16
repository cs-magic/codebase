import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardWhereUniqueInputSchema } from '../inputTypeSchemas/CardWhereUniqueInputSchema'
import { CardCreateInputSchema } from '../inputTypeSchemas/CardCreateInputSchema'
import { CardUncheckedCreateInputSchema } from '../inputTypeSchemas/CardUncheckedCreateInputSchema'
import { CardUpdateInputSchema } from '../inputTypeSchemas/CardUpdateInputSchema'
import { CardUncheckedUpdateInputSchema } from '../inputTypeSchemas/CardUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CardSelectSchema: z.ZodType<Prisma.CardSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.boolean().optional(),
  platformType: z.boolean().optional(),
  platformId: z.boolean().optional(),
  platformData: z.boolean().optional(),
  sourceUrl: z.boolean().optional(),
  author: z.boolean().optional(),
  time: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  cover: z.boolean().optional(),
  images: z.boolean().optional(),
  iFrames: z.boolean().optional(),
  videos: z.boolean().optional(),
  contentMd: z.boolean().optional(),
  contentSummary: z.boolean().optional(),
  stat: z.boolean().optional(),
  ossUrl: z.boolean().optional(),
}).strict()

export const CardUpsertArgsSchema: z.ZodType<Prisma.CardUpsertArgs> = z.object({
  select: CardSelectSchema.optional(),
  where: CardWhereUniqueInputSchema,
  create: z.union([ CardCreateInputSchema,CardUncheckedCreateInputSchema ]),
  update: z.union([ CardUpdateInputSchema,CardUncheckedUpdateInputSchema ]),
}).strict() ;

export default CardUpsertArgsSchema;
