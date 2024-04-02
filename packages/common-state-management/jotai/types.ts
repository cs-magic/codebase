import { WritableAtom } from "jotai"
import { RESET } from "jotai/utils"

export type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET)

export type Atom<T> = WritableAtom<T, [SetStateActionWithReset<T>], void>
