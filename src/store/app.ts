import { atom } from "jotai"
import { getNewId } from "../../packages/common/lib/utils"
import { IAppInDB } from "@/schema/app"
import { uiScreenAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import {
  appsShouldSSEPersistedAtom,
  requestIdPersistedAtom,
  requestAtom,
} from "@/store/request"
import { getTriggerID } from "@/lib/utils"
import { atomWithStorage } from "jotai/utils"
import { atomWithStorageMark } from "../../packages/common/lib/atom"
import { convDetailAtom } from "@/store/conv"

//////////////////////////////
// base
//////////////////////////////

/**
 * apps queried from server, and then be used crossing components
 */
export const allAppsAtom = atom<IAppInDB[]>([])

/**
 * 用户选择app的弹窗，允许多个地方触发
 */
export const uiSelectAppsDialogOpenAtom = atom(false)

// todo :avoid persist apps
export const persistedAppsAtom = atomWithStorage<IAppInDB[]>(
  "conv.apps.list",
  [],
)

// todo :avoid persist the cur app
export const persistedCurAppIdAtom = atomWithStorageMark("conv.apps.cur", "")

//////////////////////////////
// derived
//////////////////////////////

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
      (get(uiScreenAtom).height * get(uiScreenAtom).width) /
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

export const appFinishedSSEAtom = atom(null, (get, set, appID: string) => {
  set(appsShouldSSEPersistedAtom, (draft) =>
    draft.filter((d) => d !== getTriggerID(get(requestIdPersistedAtom), appID)),
  )
})
