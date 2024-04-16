import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import type { WechatMessageWithRelations } from './WechatMessageSchema'
import type { WechatMessagePartialWithRelations } from './WechatMessageSchema'
import type { WechatMessageOptionalDefaultsWithRelations } from './WechatMessageSchema'
import type { TaskWithRelations } from './TaskSchema'
import type { TaskPartialWithRelations } from './TaskSchema'
import type { TaskOptionalDefaultsWithRelations } from './TaskSchema'
import { WechatMessageWithRelationsSchema } from './WechatMessageSchema'
import { WechatMessagePartialWithRelationsSchema } from './WechatMessageSchema'
import { WechatMessageOptionalDefaultsWithRelationsSchema } from './WechatMessageSchema'
import { TaskWithRelationsSchema } from './TaskSchema'
import { TaskPartialWithRelationsSchema } from './TaskSchema'
import { TaskOptionalDefaultsWithRelationsSchema } from './TaskSchema'

/////////////////////////////////////////
// WECHAT USER SCHEMA
/////////////////////////////////////////

export const WechatUserSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  avatar: z.string(),
  friend: z.boolean().nullish(),
  gender: z.number().int().nullish(),
  type: z.number().int().nullish(),
  weixin: z.string().nullish(),
  alias: z.string().nullish(),
  city: z.string().nullish(),
  province: z.string().nullish(),
  signature: z.string().nullish(),
  phone: z.string().array(),
  /**
   * [IWechatUserPreference]
   */
  preference: JsonValueSchema,
  /**
   * [IWechatUserData]
   */
  data: JsonValueSchema,
})

export type WechatUser = z.infer<typeof WechatUserSchema>

/////////////////////////////////////////
// WECHAT USER PARTIAL SCHEMA
/////////////////////////////////////////

export const WechatUserPartialSchema = WechatUserSchema.partial()

export type WechatUserPartial = z.infer<typeof WechatUserPartialSchema>

/////////////////////////////////////////
// WECHAT USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WechatUserOptionalDefaultsSchema = WechatUserSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WechatUserOptionalDefaults = z.infer<typeof WechatUserOptionalDefaultsSchema>

/////////////////////////////////////////
// WECHAT USER RELATION SCHEMA
/////////////////////////////////////////

export type WechatUserRelations = {
  sentMessages: WechatMessageWithRelations[];
  receivedMessages: WechatMessageWithRelations[];
  tasks: TaskWithRelations[];
};

export type WechatUserWithRelations = Omit<z.infer<typeof WechatUserSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatUserRelations

export const WechatUserWithRelationsSchema: z.ZodType<WechatUserWithRelations> = WechatUserSchema.merge(z.object({
  sentMessages: z.lazy(() => WechatMessageWithRelationsSchema).array(),
  receivedMessages: z.lazy(() => WechatMessageWithRelationsSchema).array(),
  tasks: z.lazy(() => TaskWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// WECHAT USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type WechatUserOptionalDefaultsRelations = {
  sentMessages: WechatMessageOptionalDefaultsWithRelations[];
  receivedMessages: WechatMessageOptionalDefaultsWithRelations[];
  tasks: TaskOptionalDefaultsWithRelations[];
};

export type WechatUserOptionalDefaultsWithRelations = Omit<z.infer<typeof WechatUserOptionalDefaultsSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatUserOptionalDefaultsRelations

export const WechatUserOptionalDefaultsWithRelationsSchema: z.ZodType<WechatUserOptionalDefaultsWithRelations> = WechatUserOptionalDefaultsSchema.merge(z.object({
  sentMessages: z.lazy(() => WechatMessageOptionalDefaultsWithRelationsSchema).array(),
  receivedMessages: z.lazy(() => WechatMessageOptionalDefaultsWithRelationsSchema).array(),
  tasks: z.lazy(() => TaskOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// WECHAT USER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type WechatUserPartialRelations = {
  sentMessages?: WechatMessagePartialWithRelations[];
  receivedMessages?: WechatMessagePartialWithRelations[];
  tasks?: TaskPartialWithRelations[];
};

export type WechatUserPartialWithRelations = Omit<z.infer<typeof WechatUserPartialSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatUserPartialRelations

export const WechatUserPartialWithRelationsSchema: z.ZodType<WechatUserPartialWithRelations> = WechatUserPartialSchema.merge(z.object({
  sentMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  receivedMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  tasks: z.lazy(() => TaskPartialWithRelationsSchema).array(),
})).partial()

export type WechatUserOptionalDefaultsWithPartialRelations = Omit<z.infer<typeof WechatUserOptionalDefaultsSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatUserPartialRelations

export const WechatUserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<WechatUserOptionalDefaultsWithPartialRelations> = WechatUserOptionalDefaultsSchema.merge(z.object({
  sentMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  receivedMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  tasks: z.lazy(() => TaskPartialWithRelationsSchema).array(),
}).partial())

export type WechatUserWithPartialRelations = Omit<z.infer<typeof WechatUserSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatUserPartialRelations

export const WechatUserWithPartialRelationsSchema: z.ZodType<WechatUserWithPartialRelations> = WechatUserSchema.merge(z.object({
  sentMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  receivedMessages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
  tasks: z.lazy(() => TaskPartialWithRelationsSchema).array(),
}).partial())

export default WechatUserSchema;
