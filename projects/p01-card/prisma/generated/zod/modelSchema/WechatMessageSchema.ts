import { z } from 'zod';
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
// WECHAT MESSAGE SCHEMA
/////////////////////////////////////////

export const WechatMessageSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  talkerId: z.string(),
  listenerId: z.string().nullish(),
  roomId: z.string().nullish(),
  timestamp: z.number().int(),
  type: z.number().int(),
  text: z.string().nullish(),
  mentionIdList: z.string().array(),
  filename: z.string().nullish(),
})

export type WechatMessage = z.infer<typeof WechatMessageSchema>

/////////////////////////////////////////
// WECHAT MESSAGE PARTIAL SCHEMA
/////////////////////////////////////////

export const WechatMessagePartialSchema = WechatMessageSchema.partial()

export type WechatMessagePartial = z.infer<typeof WechatMessagePartialSchema>

/////////////////////////////////////////
// WECHAT MESSAGE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const WechatMessageOptionalDefaultsSchema = WechatMessageSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type WechatMessageOptionalDefaults = z.infer<typeof WechatMessageOptionalDefaultsSchema>

/////////////////////////////////////////
// WECHAT MESSAGE RELATION SCHEMA
/////////////////////////////////////////

export type WechatMessageRelations = {
  talker: WechatUserWithRelations;
  listener?: WechatUserWithRelations | null;
  room?: WechatRoomWithRelations | null;
};

export type WechatMessageWithRelations = z.infer<typeof WechatMessageSchema> & WechatMessageRelations

export const WechatMessageWithRelationsSchema: z.ZodType<WechatMessageWithRelations> = WechatMessageSchema.merge(z.object({
  talker: z.lazy(() => WechatUserWithRelationsSchema),
  listener: z.lazy(() => WechatUserWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// WECHAT MESSAGE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type WechatMessageOptionalDefaultsRelations = {
  talker: WechatUserOptionalDefaultsWithRelations;
  listener?: WechatUserOptionalDefaultsWithRelations | null;
  room?: WechatRoomOptionalDefaultsWithRelations | null;
};

export type WechatMessageOptionalDefaultsWithRelations = z.infer<typeof WechatMessageOptionalDefaultsSchema> & WechatMessageOptionalDefaultsRelations

export const WechatMessageOptionalDefaultsWithRelationsSchema: z.ZodType<WechatMessageOptionalDefaultsWithRelations> = WechatMessageOptionalDefaultsSchema.merge(z.object({
  talker: z.lazy(() => WechatUserOptionalDefaultsWithRelationsSchema),
  listener: z.lazy(() => WechatUserOptionalDefaultsWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomOptionalDefaultsWithRelationsSchema).nullish(),
}))

/////////////////////////////////////////
// WECHAT MESSAGE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type WechatMessagePartialRelations = {
  talker?: WechatUserPartialWithRelations;
  listener?: WechatUserPartialWithRelations | null;
  room?: WechatRoomPartialWithRelations | null;
};

export type WechatMessagePartialWithRelations = z.infer<typeof WechatMessagePartialSchema> & WechatMessagePartialRelations

export const WechatMessagePartialWithRelationsSchema: z.ZodType<WechatMessagePartialWithRelations> = WechatMessagePartialSchema.merge(z.object({
  talker: z.lazy(() => WechatUserPartialWithRelationsSchema),
  listener: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
})).partial()

export type WechatMessageOptionalDefaultsWithPartialRelations = z.infer<typeof WechatMessageOptionalDefaultsSchema> & WechatMessagePartialRelations

export const WechatMessageOptionalDefaultsWithPartialRelationsSchema: z.ZodType<WechatMessageOptionalDefaultsWithPartialRelations> = WechatMessageOptionalDefaultsSchema.merge(z.object({
  talker: z.lazy(() => WechatUserPartialWithRelationsSchema),
  listener: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
}).partial())

export type WechatMessageWithPartialRelations = z.infer<typeof WechatMessageSchema> & WechatMessagePartialRelations

export const WechatMessageWithPartialRelationsSchema: z.ZodType<WechatMessageWithPartialRelations> = WechatMessageSchema.merge(z.object({
  talker: z.lazy(() => WechatUserPartialWithRelationsSchema),
  listener: z.lazy(() => WechatUserPartialWithRelationsSchema).nullish(),
  room: z.lazy(() => WechatRoomPartialWithRelationsSchema).nullish(),
}).partial())

export default WechatMessageSchema;
