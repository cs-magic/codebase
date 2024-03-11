import { atom } from "jotai"
import { proxy } from "valtio"
import { convRefObject } from "./conv.object.ref"
import { convThisObject } from "./conv.object.this"
import { ConvClass } from "./conv.class"

/**
 * 为什么选择 valtio, see: https://github.com/pmndrs/zustand/issues/483#issuecomment-1949486418
 */
export const convStore = proxy(new ConvClass())
// export const convStore = proxy(convThisObject)
// export const convStore = proxy(convRefObject)

export const convAtomStore = atom(new ConvClass())
