import { z } from 'zod';

export const PlatformTypeSchema = z.enum(['wxmpArticle','bilibiliVideo','xhsNote']);

export type PlatformTypeType = `${z.infer<typeof PlatformTypeSchema>}`

export default PlatformTypeSchema;
