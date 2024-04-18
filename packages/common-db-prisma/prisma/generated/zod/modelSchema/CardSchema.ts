import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'
import { PlatformTypeSchema } from '../inputTypeSchemas/PlatformTypeSchema'

/////////////////////////////////////////
// CARD SCHEMA
/////////////////////////////////////////

export const CardSchema = z.object({
  platformType: PlatformTypeSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  /**
   * [IUserSummary]
   */
  user: JsonValueSchema,
  platformId: z.string().nullish(),
  /**
   * [ICardPlatform]
   */
  platformData: JsonValueSchema,
  sourceUrl: z.string().nullish(),
  /**
   * [IUserSummary]
   */
  author: JsonValueSchema,
  time: z.coerce.date().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  /**
   * [IMedia]
   */
  cover: JsonValueSchema,
  /**
   * [IMedia]
   */
  images: JsonValueSchema.array().nullable(),
  /**
   * [IMedia]
   */
  iFrames: JsonValueSchema.array().nullable(),
  /**
   * [IMedia]
   */
  videos: JsonValueSchema.array().nullable(),
  contentMd: z.string().nullish(),
  /**
   * [ICallLLMResponse]
   */
  contentSummary: JsonValueSchema,
  /**
   * [ICardStat]
   */
  stat: JsonValueSchema,
  ossUrl: z.string().nullish(),
})

export type Card = z.infer<typeof CardSchema>

/////////////////////////////////////////
// CARD PARTIAL SCHEMA
/////////////////////////////////////////

export const CardPartialSchema = CardSchema.partial()

export type CardPartial = z.infer<typeof CardPartialSchema>

/////////////////////////////////////////
// CARD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CardOptionalDefaultsSchema = CardSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CardOptionalDefaults = z.infer<typeof CardOptionalDefaultsSchema>

export default CardSchema;
