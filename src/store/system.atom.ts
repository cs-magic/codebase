import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { BEST_VIEWPOINT } from "../../packages/common-ui/config"
import { uiScreenAtom } from "../../packages/common-ui/store"
import { ScenarioType } from "../schema/scenario"

//////////////////////////////
// base
//////////////////////////////

/**
 * 场景类型
 */

export const scenarioTypeAtom = atom<ScenarioType>("text2text")

/**
 * 用户当前的输入，用于后续跳转
 */
export const userInputAtom = atom("")

/**
 * 用于用户打断生成
 */
export const appStopGeneratingScopeAtom = atom(false)

export const appsPlaceholderCountAtom = atomWithStorage("apps.placeholder.n", 2)

//////////////////////////////
// derived
//////////////////////////////

export const maxAppsOnScreenAtom = atom((get) =>
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
