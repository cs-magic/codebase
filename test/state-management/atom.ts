import { atomWithStorage } from "jotai/utils"
import { isServer } from "../../packages/common/lib/utils"

export const testPersistedStringStorageStrEmptyAtom = atomWithStorage(
  "test.str-empty",
  "",
  {
    getItem: (key, initialValue) => {
      const gotValue = isServer
        ? initialValue
        : localStorage.getItem(key) ?? initialValue
      console.log({ gotValue })
      return gotValue
    },
    setItem: (key, newValue) => {
      localStorage.setItem(key, newValue)
    },
    removeItem: (key) => {
      localStorage.removeItem(key)
    },
  },
)

export const testPersistedStringStorageStrNotEmptyAtom = atomWithStorage(
  "test.str-not-empty",
  "abs",
)

export const testPersistedStringStorageStrNotEmptyWithDeclarationAtom =
  atomWithStorage<string>("test.str-not-empty-with-declaration", "abs")
export const testPersistedStringStorageArrEmptyAtom = atomWithStorage(
  "test.arr-empty",
  [],
)
export const testPersistedStringStorageArrNotEmptyAtom = atomWithStorage(
  "test.arr-not-empty",
  [1],
)
