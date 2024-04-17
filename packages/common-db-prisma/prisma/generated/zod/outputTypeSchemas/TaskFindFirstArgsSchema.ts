import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskIncludeSchema } from '../inputTypeSchemas/TaskIncludeSchema'
import { TaskWhereInputSchema } from '../inputTypeSchemas/TaskWhereInputSchema'
import { TaskOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskOrderByWithRelationInputSchema'
import { TaskWhereUniqueInputSchema } from '../inputTypeSchemas/TaskWhereUniqueInputSchema'
import { TaskScalarFieldEnumSchema } from '../inputTypeSchemas/TaskScalarFieldEnumSchema'
import { WechatUserArgsSchema } from "../outputTypeSchemas/WechatUserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  notes: z.boolean().optional(),
  owner: z.union([z.boolean(),z.lazy(() => WechatUserArgsSchema)]).optional(),
}).strict()

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default TaskFindFirstArgsSchema;
