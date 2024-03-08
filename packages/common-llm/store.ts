import { atomWithStorage } from "jotai/utils"

export const llmDelayAtom = atomWithStorage("llm.delay", 0) // ms
