import { atomWithStorage } from "jotai/utils"
import { lowerCase } from "lodash"

export const createBoolStorageAtom = (
  name: string,
  prefix = "",
  init = false,
) => ({
  atom: atomWithStorage(
    `${prefix}.${name.split(" ").map(lowerCase).join(".")}`,
    init,
  ),
  name,
})
