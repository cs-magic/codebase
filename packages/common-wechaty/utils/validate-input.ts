import { isNumeric } from "../../common-common/is-numeric"
import {
  InputValidatorSchema,
  prettyInvalidInput,
} from "../../common-common/pretty-invalid-choice"

export const validateInput = async <T>(
  schema: InputValidatorSchema,
  input?: string,
) => {
  input ??= ""
  const parsed = await schema.safeParseAsync(input)
  if (!parsed.success) throw new Error(prettyInvalidInput(input, schema))
  return parsed.data as T
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
