import { PrimitiveAtom, WritableAtom } from "jotai"
import { RESET } from "jotai/utils"

export type SetStateActionWithReset<Value> =
  | Value
  | typeof RESET
  | ((prev: Value) => Value | typeof RESET)

export type WithInitialValue<Value> = {
  init: Value
}

// type K = WritableStream  | PrimitiveAtom
export type Atom<T> =
  // primitive
  | (PrimitiveAtom<T> & WithInitialValue<T>)
  // storage
  | WritableAtom<T, [SetStateActionWithReset<T>], void>

export type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result
