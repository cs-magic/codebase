import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { TaskStatusSchema } from '../inputTypeSchemas/TaskStatusSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import type { WechatUserWithRelations } from './WechatUserSchema'
import type { WechatUserPartialWithRelations } from './WechatUserSchema'
import type { WechatUserOptionalDefaultsWithRelations } from './WechatUserSchema'
import type { WechatRoomWithRelations } from './WechatRoomSchema'
import type { WechatRoomPartialWithRelations } from './WechatRoomSchema'
import type { WechatRoomOptionalDefaultsWithRelations } from './WechatRoomSchema'
import { WechatUserWithRelationsSchema } from './WechatUserSchema'
import { WechatUserPartialWithRelationsSchema } from './WechatUserSchema'
import { WechatUserOptionalDefaultsWithRelationsSchema } from './WechatUserSchema'
import { WechatRoomWithRelationsSchema } from './WechatRoomSchema'
import { WechatRoomPartialWithRelationsSchema } from './WechatRoomSchema'
import { WechatRoomOptionalDefaultsWithRelationsSchema } from './WechatRoomSchema'

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
  roomId: z.string().nullish(),
  notes: z.string().array(),
  priority: z.number().int(),
  /**
   * [TaskTimer]
   */
  timer: JsonValueSchema,
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
  priority: z.number().int().optional(),
}))

export type TaskOptionalDefaults = z.infer<typeof TaskOptionalDefaultsSchema>

/////////////////////////////////////////
// TASK RELATION SCHEMA
/////////////////////////////////////////

export type TaskRelations = {
  owner?: WechatUserWithRelations | null;
  room?: WechatRoomWithRelations | null;
};

export type TaskWithRelations = Omit<z.infer<typeof TaskSchema>, "timer"> & {
  timer?: JsonValueType | null;
} & TaskRelations

export const TaskWithRelationsSchema: z.ZodType<TaskWithRelations> = TaskSchema.merge(z.object({
  owner: z.lazy(() => WechatUserWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// TASK OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type TaskOptionalDefaultsRelations = {
  owner?: WechatUserOptionalDefaultsWithRelations | null;
  room?: WechatRoomOptionalDefaultsWithRelations | null;
};

export type TaskOptionalDefaultsWithRelations = Omit<z.infer<typeof TaskOptionalDefaultsSchema>, "timer"> & {
  timer?: JsonValueType | null;
} & TaskOptionalDefaultsRelations

export const TaskOptionalDefaultsWithRelationsSchema: z.ZodType<TaskOptionalDefaultsWithRelations> = TaskOptionalDefaultsSchema.merge(z.object({
  owner: z.lazy(() => WechatUserOptionalDefaultsWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// TASK PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type TaskPartialRelations = {
  owner?: WechatUserPartialWithRelations | null;
  room?: WechatRoomPartialWithRelations | null;
};

export type TaskPartialWithRelations = Omit<z.infer<typeof TaskPartialSchema>, "timer"> & {
  timer?: JsonValueType | null;
} & TaskPartialRelations

export const TaskPartialWithRelationsSchema: z.ZodType<TaskPartialWithRelations> = TaskPartialSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
})).partial()

export type TaskOptionalDefaultsWithPartialRelations = Omit<z.infer<typeof TaskOptionalDefaultsSchema>, "timer"> & {
  timer?: JsonValueType | null;
} & TaskPartialRelations

export const TaskOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TaskOptionalDefaultsWithPartialRelations> = TaskOptionalDefaultsSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
}).partial())

export type TaskWithPartialRelations = Omit<z.infer<typeof TaskSchema>, "timer"> & {
  timer?: JsonValueType | null;
} & TaskPartialRelations

export const TaskWithPartialRelationsSchema: z.ZodType<TaskWithPartialRelations> = TaskSchema.merge(z.object({
  owner: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
}).partial())

export default TaskSchema;
