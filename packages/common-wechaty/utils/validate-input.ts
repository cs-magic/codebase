import { ZodError } from "zod"
import { isNumeric } from "../../../packages/common-common/is-numeric"
import {
  InputValidatorSchema,
  prettyInvalidInput,
} from "../../../packages/common-common/pretty-invalid-choice"

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

export const robustSelect = async (schema: string[], input?: string) => {
  if (input !== undefined) {
    if (isNumeric(input)) {
      const item = schema[Number(input)]
      if (item !== undefined) return item
    } else {
      // exact
      let item = schema.findLast((s) => s === input)
      if (item !== undefined) return item

      // ambiguous, todo: user-friendly guidance
      item = schema.findLast((s) => s.includes(input))
      if (item !== undefined) return item
    }
  }

  throw new Error(prettyInvalidInput(input ?? "undefined", schema))
}
