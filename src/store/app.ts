import { atom } from "jotai"
import { getNewId } from "../../packages/common/lib/utils"
import { IAppInDB } from "@/schema/app"
import { uiScreenAtom } from "../../packages/common/store/ui"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import { requestAtom } from "@/store/request"
import { persistedAppsAtom } from "@/store/app.persisted"
import { convDetailAtom } from "@/store/conv.immer"
import { appsShouldSSEAtom, requestIDAtom } from "@/store/request.persisted"
import { getTriggerID } from "@/lib/utils"

/**
 * server query configs
 */
export const allAppsAtom = atom<IAppInDB[]>([])

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
  set(appsShouldSSEAtom, (draft) =>
    draft.filter((d) => d !== getTriggerID(get(requestIDAtom), appID)),
  )
})
