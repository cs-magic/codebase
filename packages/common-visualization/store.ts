import { atomWithStorage } from "jotai/utils"

export const mapSpacingVerticalAtom = atomWithStorage<number>(
  "map.space.vertical",
  10,
)
