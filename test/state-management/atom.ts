import { atomWithStorage } from "jotai/utils"

export const testPersistedStringStorageStrEmptyAtom = atomWithStorage(
  "test.str-empty",
  "",
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
