import { atomWithStorage } from "jotai/utils"
import lowerCase from "lodash/lowerCase.js"

export const createBoolStorageAtom = (
  name: string,
  init = false,
  prefix = "",
) => ({
  atom: atomWithStorage(
    `${prefix}.${name.split(" ").map(lowerCase).join(".")}`,
    init,
  ),
  name,
})
