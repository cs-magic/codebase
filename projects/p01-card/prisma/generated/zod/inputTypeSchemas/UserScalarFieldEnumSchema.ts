import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','image','email','phone','wxid','emailVerified','phoneVerified','wxidVerified']);

export default UserScalarFieldEnumSchema;
