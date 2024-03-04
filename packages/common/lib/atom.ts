import { atom } from "jotai"
import { isServer } from "./utils"

/**
 * 1. string 直接读
 * 2. non-string 用JSON
 * --
 * 做了各种类型校验
 *
 * ref:
 * - storage: https://jotai.org/docs/guides/persistence#a-helper-function-with-localstorage-and-json-parse
 * - type infer: https://chat.openai.com/c/30650190-d2b1-4504-8b32-377085be080f
 * @param key
 * @param initialValue
 */
export const atomWithStorageMark = <
  T extends string | number | boolean | object,
>(
  key: string,
  // 不要用类型推断
  initialValue: T,
) => {
  type TT = T extends string
    ? string
    : T extends number
      ? number
      : T extends boolean
        ? boolean
        : T extends object
          ? object
          : T
  // 必须以变量形式挂在函数内部
  //  atom<TT>(initialValue) 不行， atom(initialValue as TT) 这个可以
  const baseAtom = atom(initialValue as TT)

  // 必须以变量形式挂在函数内部
  const derivedAtom = atom(
    (get) => {
      if (!isServer) {
        const stored = localStorage.getItem(key)
        return stored
          ? typeof initialValue === "string"
            ? stored
            : JSON.parse(stored)
          : initialValue
      }
      return initialValue
    },

    (get, set, update: TT | ((prev: TT) => TT)) => {
      // if (update === undefined)  throw new Error(`you should set a new value but not!`)

      const newValue =
        typeof update === "function" ? (update(get(baseAtom)) as TT) : update
      set(baseAtom, newValue)
      localStorage.setItem(
        key,
        typeof newValue === "string" ? newValue : JSON.stringify(newValue),
      )
    },
  )
  return derivedAtom
}
