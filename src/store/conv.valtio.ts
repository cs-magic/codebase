import { proxy } from "valtio"
import { ConvClass } from "./conv.class"

/**
 * 为什么选择 valtio, see: https://github.com/pmndrs/zustand/issues/483#issuecomment-1949486418
 */
export const convStore = proxy(new ConvClass())
