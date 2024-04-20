import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CardWhereInputSchema } from '../inputTypeSchemas/CardWhereInputSchema'
import { CardOrderByWithRelationInputSchema } from '../inputTypeSchemas/CardOrderByWithRelationInputSchema'
import { CardWhereUniqueInputSchema } from '../inputTypeSchemas/CardWhereUniqueInputSchema'
import { CardScalarFieldEnumSchema } from '../inputTypeSchemas/CardScalarFieldEnumSchema'
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
  html: z.boolean().optional(),
  contentMd: z.boolean().optional(),
  contentSummary: z.boolean().optional(),
  stat: z.boolean().optional(),
  ossUrl: z.boolean().optional(),
}).strict()

export const CardFindManyArgsSchema: z.ZodType<Prisma.CardFindManyArgs> = z.object({
  select: CardSelectSchema.optional(),
  where: CardWhereInputSchema.optional(),
  orderBy: z.union([ CardOrderByWithRelationInputSchema.array(),CardOrderByWithRelationInputSchema ]).optional(),
  cursor: CardWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CardScalarFieldEnumSchema,CardScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default CardFindManyArgsSchema;
