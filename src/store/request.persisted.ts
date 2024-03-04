import { atomWithStorage } from "jotai/utils"

export const requestIDAtom = atomWithStorage("conv.requestID", "")
/**
 * 持久化监听，直到服务端已经发完为止
 */
export const appsShouldSSEAtom = atomWithStorage<string[]>(
  "conv.apps.shouldSSE",
  [],
)
