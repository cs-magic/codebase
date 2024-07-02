import { dumpInputValidator } from "./dump-input-validator";
export const formatInvalidInput = (input, validator) => {
    return `操作失败，原因：${input} ∉ {${dumpInputValidator(validator)}`;
};
