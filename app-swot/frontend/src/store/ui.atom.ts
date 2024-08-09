import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

/**
 * 是否弹窗用户 auth 界面
 */
export const checkAuthAlertDialogOpenAtom = atom(false)

/**
 * 是否弹窗用户选择 app 的界面
 */
export const selectAppsDialogOpenAtom = atom(false)

/**
 * 是否显示时间窗上的文字 log （占体积，仅调 bug 需要）
 */
export const requestsSlideTextVisibleAtom = atomWithStorage(
  "requests.slide.text.visible",
  false,
)
