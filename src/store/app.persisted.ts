import { atomWithStorage } from "jotai/utils"
import { IAppInDB } from "@/schema/app"

/**
 * user query configs in local
 */
export const persistedAppsAtom = atomWithStorage<IAppInDB[]>(
  "conv.apps.list",
  [],
  // 主要是 .next 坏了， 清楚了就好了
  //  ref: https://github.com/pmndrs/jotai/issues/1689#issuecomment-1383844588
  // { ...createJSONStorage(() => localStorage) },
)

export const persistedSelectedAppIDAtom = atomWithStorage(
  "conv.apps.selected",
  "",
)
