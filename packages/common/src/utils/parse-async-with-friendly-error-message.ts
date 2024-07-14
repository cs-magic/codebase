import { ZodError } from "zod"

import type { InputValidatorSchema } from "../schema/utils.js"

export const parseAsyncWithFriendlyErrorMessage = async <T>(
  schema: InputValidatorSchema,
  input?: string,
) => {
  try {
    const result = await schema.parseAsync(input ?? "")
    return result as T
  } catch (e) {
    if (e instanceof ZodError) {
      const message = JSON.parse(e.message) as { message: string }[]
      // console.error(message[0]?.message)
      // return
      throw new Error(message[0]?.message)
    }
    console.error(e)
    throw e
  }
}
