import { z } from 'zod';
import type { AccountWithRelations } from './AccountSchema'
import type { AccountPartialWithRelations } from './AccountSchema'
import type { AccountOptionalDefaultsWithRelations } from './AccountSchema'
import type { SessionWithRelations } from './SessionSchema'
import type { SessionPartialWithRelations } from './SessionSchema'
import type { SessionOptionalDefaultsWithRelations } from './SessionSchema'
import { AccountWithRelationsSchema } from './AccountSchema'
import { AccountPartialWithRelationsSchema } from './AccountSchema'
import { AccountOptionalDefaultsWithRelationsSchema } from './AccountSchema'
import { SessionWithRelationsSchema } from './SessionSchema'
import { SessionPartialWithRelationsSchema } from './SessionSchema'
import { SessionOptionalDefaultsWithRelationsSchema } from './SessionSchema'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  image: z.string().nullish(),
  email: z.string().nullish(),
  phone: z.string().nullish(),
  wxid: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  phoneVerified: z.coerce.date().nullish(),
  wxidVerified: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// USER RELATION SCHEMA
/////////////////////////////////////////

export type UserRelations = {
  accounts: AccountWithRelations[];
  sessions: SessionWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type UserOptionalDefaultsRelations = {
  accounts: AccountOptionalDefaultsWithRelations[];
  sessions: SessionOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountOptionalDefaultsWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// USER PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type UserPartialRelations = {
  accounts?: AccountPartialWithRelations[];
  sessions?: SessionPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  accounts: z.lazy(() => AccountPartialWithRelationsSchema).array(),
  sessions: z.lazy(() => SessionPartialWithRelationsSchema).array(),
}).partial())

export default UserSchema;
