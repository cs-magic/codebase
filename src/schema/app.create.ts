import { z } from "zod"

/**
 * todo: use from config model
 */
export const createAppSchema = z.object({
  id: z.string(),
  modelName: z.string(),
  title: z.string().nullable(),
  systemPrompt: z.string().nullable(),
  temperature: z.number().nullable(),
})
export type ICreateApp = z.infer<typeof createAppSchema>
