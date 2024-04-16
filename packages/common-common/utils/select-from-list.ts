import { z } from "zod"

import { formatInvalidInput } from "./format-invalid-input"
import { isNumeric } from "./is-numeric"

/**
 * 允许用户输入数组的下标或者值
 * @param schema
 * @param input
 * @return 下标
 */
export const selectFromList = async (
  schema: string[],
  input?: string,
): Promise<number> => {
  if (input !== undefined) {
    if (isNumeric(input)) {
      return await z
        .number()
        .min(0)
        .max(schema.length)
        .int()
        .parseAsync(Number(input))
    } else {
      const item = schema.findLastIndex((s) => s === input)
      if (item >= 0) return item
    }
  }

  throw new Error(formatInvalidInput(input ?? "undefined", schema))
}
