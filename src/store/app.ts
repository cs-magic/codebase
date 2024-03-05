import { atom } from "jotai"
import { getNewId } from "../../packages/common/lib/utils"
import { IAppInDB } from "@/schema/app"
import { uiScreenAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import {
  appsShouldSSEPersistedAtom,
  requestAtom,
  requestIdPersistedAtom,
} from "@/store/request"
import { getTriggerID } from "@/lib/utils"
import { atomWithStorage } from "jotai/utils"
import { convDetailAtom } from "@/store/conv"

//////////////////////////////
// base
//////////////////////////////

/**
 * apps queried from server, and then be used crossing components
 */
export const serverAppsAtom = atom<IAppInDB[]>([])

/**
 * 用户选择app的弹窗，允许多个地方触发
 */
export const uiSelectAppsDialogOpenAtom = atom(false)

// todo :avoid persist apps
export const appsPersistedAtom = atomWithStorage<IAppInDB[]>(
  "conv.apps.list",
  [],
)

// todo :avoid persist the cur app
export const appIdPersistedAtom = atomWithStorage("conv.apps.cur", "")

//////////////////////////////
// derived
//////////////////////////////

export const addAppAtom = atom(null, (get, set, app: IAppInDB) => {
  set(appsPersistedAtom, (p) => [
    ...p,
    { ...app, id: getNewId() }, // new id
  ])
})

export const delAppAtom = atom(null, (get, set, id: string) => {
  set(appsPersistedAtom, (ps) => ps.filter((p) => p.id !== id))
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
