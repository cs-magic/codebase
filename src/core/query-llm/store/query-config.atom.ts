import { atom } from "jotai"
import { getNewId } from "@/lib/utils"
import { atomWithStorage } from "jotai/utils"
import { IQueryConfigInDB } from "@/core/query-llm/server/route"
import { uiMainAreaAtom } from "@/store/ui.atom"
import { BEST_VIEWPOINT } from "@/config/system"

export const queryConfigsAtom = atomWithStorage<IQueryConfigInDB[]>(
  "query.config",
  [],
)
export const refreshQueryConfigAtom = atom(null, (get, set) => {
  const newApps = get(queryConfigsAtom).map((a) => ({ ...a, id: getNewId() }))
  set(queryConfigsAtom, newApps)
  return newApps
})
export const uiSelectQueryConfigsDialogOpenAtom = atom(false)
export const uiMaxQueryConfigsAtom = atom((get) =>
  Math.max(
    Math.floor(
      (get(uiMainAreaAtom).height * get(uiMainAreaAtom).width) /
        BEST_VIEWPOINT /
        BEST_VIEWPOINT /
        2,
    ),
    2, // se: 375x667
  ),
)
