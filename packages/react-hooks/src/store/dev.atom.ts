import { atomWithStorage } from "jotai/utils"

export const devEnabledAtom = atomWithStorage("dev.enabled", false)
