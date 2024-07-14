import type { InputValidatorType } from "../schema/utils.js"
import { dumpInputValidator } from "./dump-input-validator.js"

export const formatInvalidInput = (
  input: string,
  validator: InputValidatorType,
) => {
  return `操作失败，原因：${input} ∉ {${dumpInputValidator(validator)}`
}
