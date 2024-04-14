import { ZodBoolean, ZodEnum, ZodString } from "zod"

export type InputValidatorSchema =
  | ZodBoolean
  | ZodString
  | ZodEnum<[string, ...string[]]>
export type InputValidatorType = string[] | InputValidatorSchema

export const prettyInvalidInput = (
  input: string,
  validator: InputValidatorType,
) => {
  return `操作失败，原因：${input} ∉ {${dumpInputValidator(validator)}`
}

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
