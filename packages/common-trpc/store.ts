import { atomWithStorage } from "jotai/utils"

export const trpcReactLogEnabledAtom = atomWithStorage(
  "trpc.react.log.enabled",
  true,
)
