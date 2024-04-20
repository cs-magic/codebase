import { z } from 'zod';

export const WechatMessageScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','talkerId','listenerId','roomId','timestamp','type','text','mentionIdList','filename']);

export default WechatMessageScalarFieldEnumSchema;
