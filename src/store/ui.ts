import { atom } from "jotai"
import { uiScreenAtom } from "../../packages/common/store/ui"

export const uiMobileSidebarOpen = atom(false)

export const uiInnerHeight = atom<null | number>(null)
export const uiViewportHeight = atom<number | null>(null)

export const isSoftKeyboardOn = atom(
  (get) => (get(uiInnerHeight) ?? 0) < get(uiScreenAtom).height,
)
