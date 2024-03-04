import { atomWithStorage } from "jotai/utils"
import { IAppInDB } from "@/schema/app"
import { atomWithStorageMark } from "../../packages/common/lib/atom"

/**
 * todo :avoid persisting these
 */

export const persistedAppsAtom = atomWithStorage<IAppInDB[]>(
  "conv.apps.list",
  [],
)

export const persistedSelectedAppIDAtom = atomWithStorageMark(
  "conv.apps.selected",
  "",
)
