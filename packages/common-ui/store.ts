import { atom } from "jotai"
import { IDisplay } from "./schema"

/**
 * alert dialog for loading
 */
export const uiLoadingAlertDialogAtom = atom(false)
/**
 * main-area
 */
export const uiScreenAtom = atom<IDisplay>({ width: 0, height: 0 })
/**
 * alert dialog with content
 */
export const uiAlertDialogOpen = atom(false)
export const uiAlertDialogContent = atom("")
export const openAlertDialogAtom = atom(null, (get, set, content: string) => {
  set(uiAlertDialogOpen, true)
  set(uiAlertDialogContent, content)
})
export const uiMobileSidebarOpen = atom(false)
export const uiInnerHeight = atom<null | number>(null)
export const uiViewportHeight = atom<number | null>(null)
export const isSoftKeyboardOn = atom(
  (get) => (get(uiInnerHeight) ?? 0) < get(uiScreenAtom).height,
)
