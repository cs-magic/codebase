import { atom } from "jotai"
import { IDisplay } from "@/schema/common"

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

/**
 * alert dialog for loading
 */
export const uiLoadingAlertDialogAtom = atom(false)
export const lockUIAtom = atom(null, (get, set) => {
  set(uiLoadingAlertDialogAtom, true)
})
export const unlockUIAtom = atom(null, (get, set) => {
  set(uiLoadingAlertDialogAtom, false)
})
