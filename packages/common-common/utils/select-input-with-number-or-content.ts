import { isNumeric } from "./is-numeric"

import { formatInvalidInput } from "./format-invalid-input"

export const selectInputWithNumberOrContent = async (
  schema: string[],
  input?: string,
) => {
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

  throw new Error(formatInvalidInput(input ?? "undefined", schema))
}
