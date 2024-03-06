import { atomWithStorage } from "jotai/utils"

export const llmDelayAtom = atomWithStorage("llm.delay", 100) // ms

export const devEnabledAtom = atomWithStorage("dev.enabled", false)
