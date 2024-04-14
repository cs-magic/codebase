import { z } from 'zod';

export const AccountScalarFieldEnumSchema = z.enum(['id','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','userId']);

export default AccountScalarFieldEnumSchema;
