import { z } from "zod"
import { createCallLLMSchema } from "../../packages/llm/schema"

/**
 * todo: use from config model
 */
export const createAppSchema = createCallLLMSchema.extend({
  id: z.string(),
})
export type ICreateApp = z.infer<typeof createAppSchema>
