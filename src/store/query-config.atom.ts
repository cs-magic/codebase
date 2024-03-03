import { atom } from "jotai"
import { getNewId } from "../../packages/common/lib/utils"
import { atomWithStorage } from "jotai/utils"
import { IQueryConfigInDB } from "@/schema/query-config"
import { uiMainAreaAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"

/**
 * server query configs
 */
export const allQueryConfigsAtom = atom<IQueryConfigInDB[]>([])

/**
 * user query configs in local
 */
export const persistedQueryConfigsAtom = atomWithStorage<IQueryConfigInDB[]>(
  "query.config",
  [],
)

export const uiSelectQueryConfigsDialogOpenAtom = atom(false)

/**
 * --- actions
 */

export const addQueryConfigAtom = atom(
  null,
  (get, set, queryConfig: IQueryConfigInDB) => {
    set(persistedQueryConfigsAtom, (p) => [queryConfig, ...p])
  },
)

export const delQueryConfigAtom = atom(null, (get, set, id: string) => {
  set(persistedQueryConfigsAtom, (ps) => ps.filter((p) => p.id !== id))
})

export const refreshQueryConfigAtom = atom(null, (get, set) => {
  const newApps = get(persistedQueryConfigsAtom).map((a) => ({
    ...a,
    id: getNewId(),
  }))
  set(persistedQueryConfigsAtom, newApps)
  return newApps
})
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
