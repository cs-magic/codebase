import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import type { JsonValueType } from '../inputTypeSchemas/JsonValueSchema';
import type { WechatMessageWithRelations } from './WechatMessageSchema'
import type { WechatMessagePartialWithRelations } from './WechatMessageSchema'
import type { WechatMessageOptionalDefaultsWithRelations } from './WechatMessageSchema'
import { WechatMessageWithRelationsSchema } from './WechatMessageSchema'
import { WechatMessagePartialWithRelationsSchema } from './WechatMessageSchema'
import { WechatMessageOptionalDefaultsWithRelationsSchema } from './WechatMessageSchema'

/////////////////////////////////////////
// WECHAT ROOM SCHEMA
/////////////////////////////////////////

export const WechatRoomSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  adminIdList: z.string().array(),
  memberIdList: z.string().array(),
  avatar: z.string().nullish(),
  topic: z.string().nullish(),
  ownerId: z.string().nullish(),
  /**
   * [IWechatUserPreference]
   */
  preference: JsonValueSchema,
  /**
   * [IWechatUserData]
   */
  data: JsonValueSchema,
})

export type WechatRoom = z.infer<typeof WechatRoomSchema>

/////////////////////////////////////////
// WECHAT ROOM PARTIAL SCHEMA
/////////////////////////////////////////

export const WechatRoomPartialSchema = WechatRoomSchema.partial()

export type WechatRoomPartial = z.infer<typeof WechatRoomPartialSchema>

/////////////////////////////////////////
// WECHAT ROOM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WechatRoomOptionalDefaultsSchema = WechatRoomSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WechatRoomOptionalDefaults = z.infer<typeof WechatRoomOptionalDefaultsSchema>

/////////////////////////////////////////
// WECHAT ROOM RELATION SCHEMA
/////////////////////////////////////////

export type WechatRoomRelations = {
  messages: WechatMessageWithRelations[];
};

export type WechatRoomWithRelations = Omit<z.infer<typeof WechatRoomSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatRoomRelations

export const WechatRoomWithRelationsSchema: z.ZodType<WechatRoomWithRelations> = WechatRoomSchema.merge(z.object({
  messages: z.lazy(() => WechatMessageWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// WECHAT ROOM OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type WechatRoomOptionalDefaultsRelations = {
  messages: WechatMessageOptionalDefaultsWithRelations[];
};

export type WechatRoomOptionalDefaultsWithRelations = Omit<z.infer<typeof WechatRoomOptionalDefaultsSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatRoomOptionalDefaultsRelations

export const WechatRoomOptionalDefaultsWithRelationsSchema: z.ZodType<WechatRoomOptionalDefaultsWithRelations> = WechatRoomOptionalDefaultsSchema.merge(z.object({
  messages: z.lazy(() => WechatMessageOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// WECHAT ROOM PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type WechatRoomPartialRelations = {
  messages?: WechatMessagePartialWithRelations[];
};

export type WechatRoomPartialWithRelations = Omit<z.infer<typeof WechatRoomPartialSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatRoomPartialRelations

export const WechatRoomPartialWithRelationsSchema: z.ZodType<WechatRoomPartialWithRelations> = WechatRoomPartialSchema.merge(z.object({
  messages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
})).partial()

export type WechatRoomOptionalDefaultsWithPartialRelations = Omit<z.infer<typeof WechatRoomOptionalDefaultsSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatRoomPartialRelations

export const WechatRoomOptionalDefaultsWithPartialRelationsSchema: z.ZodType<WechatRoomOptionalDefaultsWithPartialRelations> = WechatRoomOptionalDefaultsSchema.merge(z.object({
  messages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
}).partial())

export type WechatRoomWithPartialRelations = Omit<z.infer<typeof WechatRoomSchema>, "preference" | "data"> & {
  preference?: JsonValueType | null;
  data?: JsonValueType | null;
} & WechatRoomPartialRelations

export const WechatRoomWithPartialRelationsSchema: z.ZodType<WechatRoomWithPartialRelations> = WechatRoomSchema.merge(z.object({
  messages: z.lazy(() => WechatMessagePartialWithRelationsSchema).array(),
}).partial())

export default WechatRoomSchema;
