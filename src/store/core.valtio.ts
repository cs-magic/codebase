import { proxy } from "valtio"
import { CoreStore } from "../implementation/core-store"

/**
 * 为什么选择 valtio, see: https://github.com/pmndrs/zustand/issues/483#issuecomment-1949486418
 */
export const coreStore = proxy(new CoreStore())
