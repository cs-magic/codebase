import { atomWithStorage } from "jotai/utils"

export const mapSpacingVerticalAtom = atomWithStorage<number | undefined>(
  "map.space.vertical",
  5, // 5这个高度正合适
)
