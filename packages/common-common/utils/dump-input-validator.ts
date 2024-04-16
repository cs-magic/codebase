import { ZodBoolean, ZodString } from "zod"

import { InputValidatorType } from "../schema/utils"

export const dumpInputValidator = (v: InputValidatorType): string => {
  if ("options" in v)
    return dumpInputValidator(
      v.options.map(
        (o) =>
          // o instanceof ZodLiteral ? o.value :
          o,
      ),
    )

  if (v instanceof Array) return v.join(",")

  if (v instanceof ZodString) return "有效字符串" // todo: more-friendly ?

  if (v instanceof ZodBoolean) return "true/false"

  return v
}
