import { atom } from "jotai"

export const nodeEnvAtom = atom<"development" | "test" | "production">(
  "production",
)
