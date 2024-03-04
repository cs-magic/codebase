import { atom } from "jotai"
import { getNewId } from "../../packages/common/lib/utils"
import { atomWithStorage } from "jotai/utils"
import { IAppInDB } from "@/schema/app"
import { uiMainAreaAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import { convDetailAtom } from "@/store/conv.atom"
import { requestAtom } from "@/store/request.atom"

/**
 * server query configs
 */
export const allAppsAtom = atom<IAppInDB[]>([])

/**
 * user query configs in local
 */
export const persistedAppsAtom = atomWithStorage<IAppInDB[]>("conv.apps", [])
export const selectedAppIDAtom = atomWithStorage("conv.apps.selected", "")

export const uiSelectAppsDialogOpenAtom = atom(false)

/**
 * --- actions
 */

export const addAppAtom = atom(null, (get, set, app: IAppInDB) => {
  set(persistedAppsAtom, (p) => [
    ...p,
    { ...app, id: getNewId() }, // new id
  ])
})

export const delAppAtom = atom(null, (get, set, id: string) => {
  set(persistedAppsAtom, (ps) => ps.filter((p) => p.id !== id))
})

export const uiMaxAppsAtom = atom((get) =>
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

export const convAppsAtom = atom<IAppInDB[]>(
  (get) =>
    get(requestAtom)?.responses.map((r) => r.app) ??
    get(convDetailAtom)?.apps ??
    [],
)
