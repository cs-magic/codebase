import { InputValidatorType } from "../schema/utils"
import { dumpInputValidator } from "./dump-input-validator"

export const formatInvalidInput = (
  input: string,
  validator: InputValidatorType,
) => {
  return `操作失败，原因：${input} ∉ {${dumpInputValidator(validator)}`
}
