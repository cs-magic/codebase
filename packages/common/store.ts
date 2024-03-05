import { atomWithStorage } from "jotai/utils"

export const llmDelayAtom = atomWithStorage("llm.delay", 100) // ms
