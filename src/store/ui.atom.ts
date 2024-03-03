import { atom } from "jotai"

import { IDisplay } from "../../packages/common/schema/ui"
import { uiLoadingAlertDialogAtom } from "../../packages/common/store/ui"

/**
 * main-area
 */
export const uiMainAreaAtom = atom<IDisplay>({ width: 0, height: 0 })

/**
 * alert dialog with content
 */
export const uiAlertDialogOpen = atom(false)
export const uiAlertDialogContent = atom("")
export const openAlertDialogAtom = atom(null, (get, set, content: string) => {
  set(uiAlertDialogOpen, true)
  set(uiAlertDialogContent, content)
})

export const lockUIAtom = atom(null, (get, set) => {
  set(uiLoadingAlertDialogAtom, true)
})
export const unlockUIAtom = atom(null, (get, set) => {
  set(uiLoadingAlertDialogAtom, false)
})
