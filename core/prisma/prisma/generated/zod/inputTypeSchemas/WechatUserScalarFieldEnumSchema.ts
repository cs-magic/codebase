import { z } from 'zod';

export const WechatUserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','avatar','friend','gender','type','weixin','alias','city','province','signature','phone','preference','data']);

export default WechatUserScalarFieldEnumSchema;
