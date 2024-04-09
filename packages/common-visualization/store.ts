import { atomWithStorage } from "jotai/utils"

export const mapSpacingVerticalAtom = atomWithStorage<number>(
  "map.space.vertical",
  10,
)
export const mapLevelsMaxAtom = atomWithStorage("card.map.levels.max", 3)
