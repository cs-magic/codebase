import { produce } from "immer"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { BEST_VIEWPOINT } from "../../packages/common/config/system"
import { getNewId } from "../../packages/common/lib/utils"
import { uiScreenAtom } from "../../packages/common/store/ui"
import { IAppDetail } from "../schema/app.detail" //////////////////////////////

//////////////////////////////
// base
//////////////////////////////

/**
 * apps queried from server, and then be used crossing components
 */
export const serverAppsAtom = atom<IAppDetail[]>([])

/**
 * 用户选择app的弹窗，允许多个地方触发
 */
export const uiSelectAppsDialogOpenAtom = atom(false)

// todo: avoid persist apps
export const appsPersistedAtom = atomWithStorage<IAppDetail[]>(
  "conv.apps.list",
  [],
)

// todo: avoid persist the cur app
export const appIdPersistedAtom = atomWithStorage("conv.apps.cur", "")

//////////////////////////////
// scope
//////////////////////////////

// 因为我们可以直接基于服务端的responding信息确认我们需不需要手动拉起sse，因此不需要额外记录信息了
// export const appIsFetchingAtom = atom(false)
export const stopGeneratingAtom = atom(false)

//////////////////////////////
// derived
//////////////////////////////

export const forkAppAtom = atom(null, (get, set, forkFromId: string) => {
  set(appsPersistedAtom, (prevApps) =>
    produce(prevApps, (prevApps) => {
      const index = prevApps.findIndex((a) => a.id === forkFromId)
      const newApp = { ...prevApps[index]!, id: getNewId() }
      prevApps.splice(index, 0, newApp)
    }),
  )
})

export const pushAppAtom = atom(null, (get, set, app: IAppDetail) => {
  set(appsPersistedAtom, (prev) => [...prev, app])
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

export const appsGridColsAtom = atom((get) => {
  const { width } = get(uiScreenAtom)
  const nApps = get(appsPersistedAtom).length
  return width // 未初始化时避免闪烁
    ? Math.min(Math.floor(width / BEST_VIEWPOINT), nApps)
    : nApps
})
