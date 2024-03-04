import { atomWithStorage } from "jotai/utils"
import { isServer } from "../../packages/common/lib/utils"

export const testPersistedStringStorage = atomWithStorage(
  "test.aotomWithStorage.string",
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
