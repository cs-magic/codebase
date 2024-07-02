import { WritableAtom, PrimitiveAtom } from "jotai";
import { RESET } from "jotai/utils";
export type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);
export type WithInitialValue<Value> = {
    init: Value;
};
export type Atom<T> = (PrimitiveAtom<T> & WithInitialValue<T>) | WritableAtom<T, [SetStateActionWithReset<T>], void>;
export type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;
