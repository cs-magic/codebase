import { z } from 'zod';
import { TaskStatusSchema } from '../inputTypeSchemas/TaskStatusSchema'
import type { WechatUserWithRelations } from './WechatUserSchema'
import type { WechatUserPartialWithRelations } from './WechatUserSchema'
import type { WechatUserOptionalDefaultsWithRelations } from './WechatUserSchema'
import { WechatUserWithRelationsSchema } from './WechatUserSchema'
import { WechatUserPartialWithRelationsSchema } from './WechatUserSchema'
import { WechatUserOptionalDefaultsWithRelationsSchema } from './WechatUserSchema'

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  status: TaskStatusSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  description: z.string().nullish(),
  ownerId: z.string().nullish(),
  notes: z.string().array(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// TASK PARTIAL SCHEMA
/////////////////////////////////////////

export const TaskPartialSchema = TaskSchema.partial()

export type TaskPartial = z.infer<typeof TaskPartialSchema>

/////////////////////////////////////////
// TASK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TaskOptionalDefaultsSchema = TaskSchema.merge(z.object({
  status: TaskStatusSchema.optional(),
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type TaskOptionalDefaults = z.infer<typeof TaskOptionalDefaultsSchema>

/////////////////////////////////////////
// TASK RELATION SCHEMA
/////////////////////////////////////////

export type TaskRelations = {
  owner?: WechatUserWithRelations | null;
};

export type TaskWithRelations = z.infer<typeof TaskSchema> & TaskRelations

export const TaskWithRelationsSchema: z.ZodType<TaskWithRelations> = TaskSchema.merge(z.object({
  owner: z.lazy(() => WechatUserWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// TASK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TaskOptionalDefaultsRelations = {
  owner?: WechatUserOptionalDefaultsWithRelations | null;
};

export type TaskOptionalDefaultsWithRelations = z.infer<typeof TaskOptionalDefaultsSchema> & TaskOptionalDefaultsRelations

export const TaskOptionalDefaultsWithRelationsSchema: z.ZodType<TaskOptionalDefaultsWithRelations> = TaskOptionalDefaultsSchema.merge(z.object({
  owner: z.lazy(() => WechatUserOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// TASK PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type TaskPartialRelations = {
  owner?: WechatUserPartialWithRelations | null;
};

export type TaskPartialWithRelations = z.infer<typeof TaskPartialSchema> & TaskPartialRelations

export const TaskPartialWithRelationsSchema: z.ZodType<TaskPartialWithRelations> = TaskPartialSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
})).partial()

export type TaskOptionalDefaultsWithPartialRelations = z.infer<typeof TaskOptionalDefaultsSchema> & TaskPartialRelations

export const TaskOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TaskOptionalDefaultsWithPartialRelations> = TaskOptionalDefaultsSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
}).partial())

export type TaskWithPartialRelations = z.infer<typeof TaskSchema> & TaskPartialRelations

export const TaskWithPartialRelationsSchema: z.ZodType<TaskWithPartialRelations> = TaskSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
}).partial())

export default TaskSchema;
