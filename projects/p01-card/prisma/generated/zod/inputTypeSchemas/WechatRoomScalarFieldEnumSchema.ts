import { z } from 'zod';

export const WechatRoomScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','adminIdList','memberIdList','avatar','topic','ownerId','preference','data']);

export default WechatRoomScalarFieldEnumSchema;
