import { atomWithStorage } from "jotai/utils";
import { lowerCase } from "lodash";
export const createBoolStorageAtom = (name, init = false, prefix = "") => ({
    atom: atomWithStorage(`${prefix}.${name.split(" ").map(lowerCase).join(".")}`, init),
    name,
});
